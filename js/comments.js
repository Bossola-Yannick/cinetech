let detailClick = JSON.parse(localStorage.getItem("detail"));
let commentsList = JSON.parse(localStorage.getItem("comments")) || [];
let replyList = JSON.parse(localStorage.getItem("reply")) || [];

const date = new Date();
const dateFormat = date.toISOString().split("T")[0];

// elements
const sectionComment = document.getElementById("comment");

// variable
let type;
detailClick.name ? (type = "tv") : (type = "movie");
let currentPage = 1;
const commentsPerPage = 5;
let pageReply = 1;
const maxReply = 3;

// méthode contre les injections
const htmlentities = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// méthode erreurs sur pseudo / commentaires
const errorInputs = (pseudo, comment, box) => {
  const error = box.querySelector(".error");

  if (!pseudo) {
    error.classList.add("red");
    error.innerText = "Veuillez saisir un pseudo";
    setTimeout(() => {
      error.innerText = "";
      error.classList.remove("red");
    }, 2000);
    return false;
  }

  if (pseudo.length >= 10 || pseudo.length < 3) {
    error.classList.add("red");
    error.innerText = "Le pseudo doit contenir entre 3 et 10 caractères";
    setTimeout(() => {
      error.innerText = "";
      error.classList.remove("red");
    }, 2000);
    return false;
  }

  if (comment.length < 5) {
    error.classList.add("red");
    error.innerText = "Fait un effort...";
    setTimeout(() => {
      error.innerText = "";
      error.classList.remove("red");
    }, 2000);
    return false;
  }

  error.classList.add("green");
  error.innerText = "Commentaire ajouté";
  setTimeout(() => {
    error.innerText = "";
    error.classList.remove("green");
  }, 2000);
  return true;
};

// boite ajout commentaire
const addComment = document.createElement("div");
addComment.classList.add("add-comment-box");
addComment.innerHTML = `
  <input id="input-name" type="text" class="input-pseudo" placeholder="Pseudo">
  <textarea class="input-comment" rows="2" placeholder="Ajouter un commentaire"></textarea>
  <div class="button-box">
    <button type="submit" class="cancel-comment-button">Annuler</button>
    <button type="submit" class="add-comment-button">Valider</button>
  </div>
  <p class="error"></p>
  `;
sectionComment.appendChild(addComment);

// ajustement boite commentaire selon la longueur du texte
const addCommentText = document.querySelector(".input-comment");
addCommentText.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

const buttonAddComment = document.querySelector(".add-comment-button");
const buttonCancelComment = document.querySelector(".cancel-comment-button");
const textAreaInput = document.querySelector("textarea");
const inputName = document.getElementById("input-name");

// événement affichage button et username input
textAreaInput.addEventListener("click", () => {
  inputName.style.display = "block";
  buttonAddComment.style.display = "block";
  buttonCancelComment.style.display = "block";
});

buttonCancelComment.addEventListener("click", () => {
  inputName.style.display = "none";
  buttonAddComment.style.display = "none";
  buttonCancelComment.style.display = "none";
});

const sectionReview = document.createElement("div");
sectionReview.classList.add("all-reviews");
// créer la boite pour chaque commentaire
const createCommentBox = (name, comment, date, id_comment) => {
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");
  reviewBox.setAttribute("value", id_comment);
  reviewBox.innerHTML = `
    <div class="review-text">
        <div class="title-comment">
            <p class="pseudo">${name}</p>
            <span class="date">date: ${date}</span>
        </div>
            <p class="comment-text">${comment}</p>
            <div class="button-box">
                <button type="submit" value="${id_comment}" class="reply-comment-button">Répondre</button>
            </div>
    </div>
    <div class="review-form" value="${id_comment}"></div>
    <div class="review-reply" value="${id_comment}"></div>
            `;
  sectionReview.appendChild(reviewBox);
  sectionComment.appendChild(sectionReview);
};

// recupere les infos commentaires
async function getReviews(id, type) {
  const totalComment = [];

  // manual commentaires
  commentsList
    .filter((review) => review.id_detail === id)
    .reverse()
    .forEach((result) => {
      totalComment.push(result);
    });

  // limite recuperation des commentaires a 5pages
  for (let i = 1; i <= 5; i++) {
    const reviews = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=${i}`;
    let data = await getData(reviews);

    if (data && data.results) {
      //   sectionReview.innerHTML = "";

      data.results.forEach((result) => {
        totalComment.push(result);
      });
    }
  }

  // trie les commentaires du plus recent au plus ancien
  totalComment.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // pagination
  pageComments(totalComment, currentPage);
  pageNumberButtons(totalComment);
}

// affichage de 5 commentaires par page
const pageComments = (comments, page) => {
  sectionReview.innerHTML = "";

  const startIndex = (page - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;

  const paginatedComments = comments.slice(startIndex, endIndex);
  paginatedComments.forEach((review) => {
    const date = (review.created_at || review.date).split("T")[0];
    createCommentBox(
      review.author_details?.username || review.pseudo,
      review.content || review.comment,
      date,
      review.id || review.id_comment
    );

    getReplyComments(review.id || review.id_comment);
    replyButtonEvent();
  });
};

// pagination boutons
const pageNumberButtons = (totalComments) => {
  const pagesBox = document.createElement("div");
  pagesBox.classList.add("pages-box");

  const totalPages = Math.ceil(totalComments.length / commentsPerPage);

  // bouton précédent
  const prevButton = document.createElement("a");
  prevButton.setAttribute("href", "#comment-title");
  prevButton.classList.add("previous-next");
  prevButton.innerText = "Précédent";
  currentPage === 1
    ? (prevButton.style.visibility = "hidden")
    : (prevButton.style.visibility = "visible");
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      pageComments(totalComments, currentPage);
      pageNumberButtons(totalComments);
    }
  });
  pagesBox.appendChild(prevButton);

  // numéro pages
  for (let page = 1; page <= totalPages; page++) {
    const pageNumberP = document.createElement("a");
    pageNumberP.setAttribute("href", "#comment-title");
    pageNumberP.classList.add("page-number");
    pageNumberP.innerText = page;

    if (page === currentPage) {
      pageNumberP.classList.add("active-page");
    } else {
      pageNumberP.classList.remove("active-page");
    }

    pagesBox.appendChild(pageNumberP);

    pageNumberP.addEventListener("click", () => {
      currentPage = page;
      pageComments(totalComments, currentPage);
      pageNumberButtons(totalComments);
    });
  }

  // bouton suivant
  const nextButton = document.createElement("a");
  nextButton.setAttribute("href", "#comment-title");
  nextButton.classList.add("previous-next");
  nextButton.innerText = "Suivant";
  currentPage === totalPages
    ? (nextButton.style.visibility = "hidden")
    : (nextButton.style.visibility = "visible");
  nextButton.addEventListener("click", () => {
    if (currentPage >= 1) {
      currentPage++;
      pageComments(totalComments, currentPage);
      pageNumberButtons(totalComments);
    }
  });
  pagesBox.appendChild(nextButton);
  sectionReview.appendChild(pagesBox);
};

// évènement ajout de commentaire
if (buttonAddComment) {
  buttonAddComment.addEventListener("click", (e) => {
    e.preventDefault();
    const inputPseudo = document.querySelector(".input-pseudo");
    const inputComment = document.querySelector(".input-comment");

    // gestion inputs
    const pseudo = htmlentities(inputPseudo.value.trim());
    const comment = htmlentities(inputComment.value.trim());

    // sauvegarde le commentaire en local storage
    if (errorInputs(pseudo, comment, addComment)) {
      const id = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
      const objectComment = {
        id_detail: detailClick.id,
        id_comment: id,
        type: type,
        pseudo: pseudo,
        comment: comment,
        date: dateFormat,
      };

      commentsList.push(objectComment);
      localStorage.setItem("comments", JSON.stringify(commentsList));

      inputPseudo.value = "";
      inputComment.value = "";

      getReviews(detailClick.id, type);

      setTimeout(() => {
        inputName.style.display = "none";
        buttonAddComment.style.display = "none";
        buttonCancelComment.style.display = "none";
      }, 1000);
    }
  });
}

// créer la boite pour chaque réponse
const createReplyCommentBox = (name, comment, date, box) => {
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("reply-box");
  reviewBox.innerHTML = `
      <div class="review-text reply">
          <div class="title-comment">
              <p class="pseudo">${name}</p>
              <span class="date">date: ${date}</span>
          </div>
              <p class="comment-text">${comment}</p> 
              `;
  box.appendChild(reviewBox);
};

// gestion Voir plus / voir moins pour les reponses de commentaire
const displayShowMore = (id, totalReply, box) => {
  if (maxReply < totalReply) {
    const divShowMore = document.createElement("div");
    divShowMore.classList.add("show-more-box");

    // voir plus
    const showMore = document.createElement("p");
    showMore.classList.add("show-more");
    showMore.innerText = `${totalReply} réponses - Voir plus...`;

    divShowMore.appendChild(showMore);
    box.appendChild(divShowMore);

    showMore.addEventListener("click", () => {
      box.innerHTML = "";
      replyList
        .filter((reply) => reply.reply_to === id)
        .slice(0, totalReply)
        .forEach((reply) => {
          createReplyCommentBox(reply.pseudo, reply.comment, reply.date, box);
        });
      divShowMore.innerHTML = "";

      // voir moins
      const showLess = document.createElement("a");
      showLess.classList.add("show-less");
      showLess.innerText = `Voir moins...`;
      divShowMore.appendChild(showLess);
      box.appendChild(divShowMore);

      showLess.addEventListener("click", () => {
        const commentElement = document.querySelector(
          `.review-box[value="${id}"]`
        );

        if (commentElement) {
          commentElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        getReplyComments(id);
      });
    });
  }
};

// recupere les reponses du commentaire
const getReplyComments = (id, showAllReply = false) => {
  const reviewReply = document.querySelectorAll(".review-reply");
  reviewReply.forEach((box) => {
    let checkId = box.getAttribute("value");
    if (checkId === id) {
      box.innerHTML = "";

      const repliesToShow = replyList
        .filter((reply) => reply.reply_to === id)
        .slice(0, showAllReply ? replyList.length : maxReply);

      repliesToShow.forEach((reply) => {
        createReplyCommentBox(reply.pseudo, reply.comment, reply.date, box);
      });

      const totalReply = replyList.filter(
        (reply) => reply.reply_to === id
      ).length;

      if (!showAllReply) {
        displayShowMore(id, totalReply, box);
      }
    }
  });
};

// création boite repondre form
const replyForm = (id) => {
  const addReply = document.createElement("div");
  addReply.classList.add("add-reply-box");
  addReply.innerHTML = `
        <input id="reply-name" type="text" class="reply-pseudo" placeholder="Pseudo">
        <textarea class="reply-comment" rows="3" placeholder="Ajouter un commentaire"></textarea>
        <div class="button-box">
            <button type="submit" class="cancel-reply-button">Annuler</button>
            <button type="submit" class="add-reply-button">Valider</button>
        </div>
        <p class="error"></p>
        `;

  // événement bouton ajout reponse
  const buttonAdd = addReply.querySelector(".add-reply-button");
  buttonAdd.addEventListener("click", () => {
    const inputPseudo = document.querySelector(".reply-pseudo");
    const inputComment = document.querySelector(".reply-comment");

    // gestion inputs
    const pseudo = htmlentities(inputPseudo.value.trim());
    const comment = htmlentities(inputComment.value.trim());

    // sauvegarde le commentaire en local storage
    if (errorInputs(pseudo, comment, addReply)) {
      const objectComment = {
        reply_to: id,
        pseudo: pseudo,
        comment: comment,
        date: dateFormat,
      };

      replyList.push(objectComment);
      localStorage.setItem("reply", JSON.stringify(replyList));

      // Réinitialisation des champs
      inputPseudo.value = "";
      inputComment.value = "";

      // recup des reponses du commentaire
      getReplyComments(id, true);

      addReply.remove();
    }
  });

  // événement bouton annuler
  const buttonCancel = addReply.querySelector(".cancel-reply-button");
  buttonCancel.addEventListener("click", () => {
    addReply.remove();
  });

  const replysBox = document.querySelectorAll(".review-form");
  replysBox.forEach((box) => {
    let checkId = box.getAttribute("value");
    if (checkId === id) {
      box.innerHTML = "";
      box.appendChild(addReply);
      console.log(box);
    }
  });

  const addReplyText = document.querySelector(".reply-comment");
  addReplyText.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
};

// événement boutons répondre
const replyButtonEvent = () => {
  const buttonReply = document.querySelectorAll(".reply-comment-button");
  buttonReply.forEach((button) => {
    button.addEventListener("click", () => {
      const idComment = button.getAttribute("value");
      replyForm(idComment);
    });
  });
};

// récupere les boutons repondre de chaque commentaires
getReviews(detailClick.id, type).then(() => {
  replyButtonEvent();
});
