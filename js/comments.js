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
    // addComment.appendChild(error);
    setTimeout(() => {
      error.innerText = "";
      error.classList.remove("red");
    }, 2000);
    return false;
  }

  if (pseudo.length >= 10 || pseudo.length < 3) {
    error.classList.add("red");
    error.innerText = "Le pseudo doit contenir entre 3 et 10 caractères";
    // addComment.appendChild(error);
    setTimeout(() => {
      error.innerText = "";
      error.classList.remove("red");
    }, 2000);
    return false;
  }

  if (comment.length < 5) {
    error.classList.add("red");
    error.innerText = "Fait un effort...";
    // addComment.appendChild(error);
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

// ****************************************** //
// ********** Ajout de commentaire ********* //
// **************************************** //

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
const ajoutCommentText = document.querySelector(".input-comment");
ajoutCommentText.addEventListener("input", function () {
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

// ****************************************** //
// ******* Affichage de commentaires ******* //
// **************************************** //

const sectionReview = document.createElement("div");
sectionReview.classList.add("all-reviews");

// créer la boite pour chaque commentaire
const createCommentBox = (name, comment, date, id_comment) => {
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");
  reviewBox.innerHTML = `
    <div class="review-text">
        <div class="title-comment">
            <p class="pseudo">${name}</p>
            <span class="date">date: ${date}</span>
        </div>
            <p>${comment}</p>
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
async function getReviewMovies(id, type) {
  sectionReview.innerHTML = "";

  // manual commentaire
  commentsList
    .filter((review) => review.id_detail === id)
    .reverse()
    .forEach((review) => {
      createCommentBox(
        review.pseudo,
        review.comment,
        review.date,
        review.id_comment
      );
      getReplyComments(review.id_comment);
    });

  // get commentaire
  const reviewMovies = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1`;
  let data = await getData(reviewMovies);

  if (data && data.results) {
    const dataMax = data.results.slice(0, 5);
    dataMax.reverse().forEach((review) => {
      const date = review.created_at.split("T")[0];
      createCommentBox(
        review.author_details?.username,
        review.content,
        date,
        review.id
      );
      getReplyComments(review.id_comment);
    });
  }
}

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

      // Réinitialisation des champs
      inputPseudo.value = "";
      inputComment.value = "";

      getReviewMovies(detailClick.id, type);

      setTimeout(() => {
        inputName.style.display = "none";
        buttonAddComment.style.display = "none";
        buttonCancelComment.style.display = "none";
      }, 1000);
    }
  });
}

// getReviewMovies(detailClick.id, type);

// ****************************************** //
// ******* Repondre a un commentaire ******* //
// **************************************** //

// créer la boite pour chaque commentaire REPONSE
const createReplyCommentBox = (name, comment, date, box) => {
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("reply-box");
  reviewBox.innerHTML = `
      <div class="reply-text">
          <div class="title-comment">
              <p class="pseudo">${name}</p>
              <span class="date">date: ${date}</span>
          </div>
              <p>${comment}</p> 
              `;
  box.appendChild(reviewBox);
};

// recupere les reponses des commentaires
const getReplyComments = (id) => {
  const reviewReply = document.querySelectorAll(".review-reply");
  reviewReply.forEach((box) => {
    let checkId = box.getAttribute("value");
    if (checkId === id) {
      box.innerHTML = "";
      replyList
        .filter((reply) => reply.reply_to === id)
        .forEach((reply) => {
          createReplyCommentBox(reply.pseudo, reply.comment, reply.date, box);
        });
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

  // evenement bouton ajout reponse
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
      getReplyComments(id);

      addReply.remove();
    }
  });

  // evenement bouton annuler
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
};

// récupere les boutons repondre de chaque commentaires
getReviewMovies(detailClick.id, type).then(() => {
  const buttonReply = document.querySelectorAll(".reply-comment-button");
  buttonReply.forEach((button) => {
    button.addEventListener("click", () => {
      const idComment = button.getAttribute("value");
      replyForm(idComment);
      // recup des reponses du commentaire
    });
  });
});
