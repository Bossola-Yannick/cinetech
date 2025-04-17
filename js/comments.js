let detailClick = JSON.parse(localStorage.getItem("detail"));
let commentsList = JSON.parse(localStorage.getItem("comments")) || [];
// console.log(commentsList);

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

const mainBox = document.querySelector("main");

// boite ajout commentaire
const newSection = document.createElement("section");
newSection.classList.add("comments-section");
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
newSection.appendChild(addComment);
mainBox.appendChild(newSection);

// ajustement boite commentaire selon la longueur du texte
const ajoutCommentText = document.querySelector(".input-comment");
ajoutCommentText.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// évènement ajout de commentaire
const buttonAddComment = document.querySelector(".add-comment-button");
buttonAddComment.addEventListener("click", (e) => {
  e.preventDefault();
  const inputPseudo = document.querySelector(".input-pseudo");
  const inputComment = document.querySelector(".input-comment");

  // gestion inputs
  //   const pseudo = "teste";
  //   const comment = "blajbabnvnaevkne";
  const pseudo = htmlentities(inputPseudo.value.trim());
  const comment = htmlentities(inputComment.value.trim());

  // sauvegarde le commentaire en local storage
  if (errorInputs(pseudo, comment)) {
    let type;
    if (detailClick.name) {
      type = "tv";
    } else {
      type = "movie";
    }

    const objectComment = {
      id: detailClick.id,
      type: type,
      pseudo: pseudo,
      comment: comment,
    };

    commentsList.push(objectComment);

    localStorage.setItem("comments", JSON.stringify(commentsList));

    // Réinitialisation des champs
    inputPseudo.value = "";
    inputComment.value = "";
  }
});
