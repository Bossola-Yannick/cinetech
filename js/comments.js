let detailClick = JSON.parse(localStorage.getItem("detail"));
let commentsList = JSON.parse(localStorage.getItem("comments")) || [];

const date = new Date();
const dateFormat = date.toISOString().split("T")[0];
console.log(date.getDate());
// elements
const sectionComment = document.getElementById("comment");
const sectionReview = document.createElement("div");
sectionReview.classList.add("all-reviews");

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
const errorInputs = (pseudo, comment) => {
  const error = document.querySelector(".error");

  if (!pseudo) {
    error.classList.add("red");
    error.innerText = "Veuillez saisir un pseudo";
    addComment.appendChild(error);
    setTimeout(() => {
      error.innerText = "";
    }, 2000);
    return false;
  }

  if (pseudo.length >= 10 || pseudo.length < 3) {
    error.classList.add("red");
    error.innerText = "Le pseudo doit contenir entre 3 et 10 caractères";
    addComment.appendChild(error);
    setTimeout(() => {
      error.innerText = "";
    }, 2000);
    return false;
  }

  if (comment.length < 5) {
    error.classList.add("red");
    error.innerText = "Fait un effort...";
    addComment.appendChild(error);
    setTimeout(() => {
      error.innerText = "";
    }, 2000);
    return false;
  }

  error.classList.add("green");
  error.innerText = "Commentaire ajouté";
  setTimeout(() => {
    error.innerText = "";
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
  <input type="text" class="input-pseudo" placeholder="Pseudo">
  <textarea class="input-comment" rows="2" placeholder="Ajouter un commentaire"></textarea>
  <div class="button-box">
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

// ****************************************** //
// ******* Affichage de commentaires ******* //
// **************************************** //

// créer la boite pour chaque commentaire
const createCommentBox = (name, comment, date = "none") => {
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");
  reviewBox.innerHTML = `
            <p>${name}</p>
            <p>${comment}</p>
            <p>date: ${date}</p>
            <div class="button-box">
                <button type="submit" class="reply-comment-button">Répondre</button>
            </div>
            `;
  sectionReview.appendChild(reviewBox);
  sectionComment.appendChild(sectionReview);
};

// recupere les infos commentaires
async function getReviewMovies(id, type) {
  sectionReview.innerHTML = "";

  // manual commentaire
  commentsList
    .filter((review) => review.id === id)
    .reverse()
    .forEach((review) => {
      createCommentBox(review.pseudo, review.comment, review.date);
    });

  // get commentaire
  const reviewMovies = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1`;
  let data = await getData(reviewMovies);

  if (data && data.results) {
    const dataMax = data.results.slice(0, 5);
    dataMax.reverse().forEach((review) => {
      const date = review.created_at.split("T")[0];
      createCommentBox(review.author_details?.username, review.content, date);
    });
  }
}

// évènement ajout de commentaire
const buttonAddComment = document.querySelector(".add-comment-button");
buttonAddComment.addEventListener("click", (e) => {
  e.preventDefault();
  const inputPseudo = document.querySelector(".input-pseudo");
  const inputComment = document.querySelector(".input-comment");

  // gestion inputs
  const pseudo = htmlentities(inputPseudo.value.trim());
  const comment = htmlentities(inputComment.value.trim());

  // sauvegarde le commentaire en local storage
  if (errorInputs(pseudo, comment)) {
    const objectComment = {
      id: detailClick.id,
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
  }
});

getReviewMovies(detailClick.id, type);
