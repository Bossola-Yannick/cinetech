//----------------  PAGINATION  ------------------------
// nombre de page
const nbRecipes = allRecipe.length;
// calcul du nombre de page
const nbPages = Math.ceil(nbRecipes / perPages);
// récupération de l'url'
const url = new URLSearchParams(location.search);
// sur quelle page on se trouve
let currentPage = parseInt(url.get("page")) || 1;
console.log(currentPage);

// mise en place de la vue de la pagination
let previousPage = $("<a></a>")
  .text("Précédent")
  .attr({ class: "paging", href: `?page=${currentPage - 1}` });
$("#paging").append(previousPage);
for (let i = 1; i <= nbPages; i++) {
  let linkPage = $("<a></a>")
    .text(i)
    .attr({ class: "paging", href: `?page=${i}` });
  $("#paging").append(linkPage);
}
const nextPage = $("<a></a>")
  .text("Suivant")
  .attr({ class: "paging", href: `?page=${currentPage + 1}` });

// conditionnement du précédent et suivant
if (currentPage === 1) {
  previousPage.text("").attr({ class: "disableLink" });
}
if (currentPage === nbPages) {
  nextPage.text("").attr({ class: "disableLink" });
}
// mise sur le DOM des élements
$("#paging").append(nextPage);

// fonction pour lancé la mise en card des recettes en fonction de la pages sélectionnée
const displayRecipes = (listRecipesPerPage) => {
  for (const recipe of listRecipesPerPage) {
    getRecipe(recipe);
  }
};

// données a afficher selon la page
const recipesForThePage = allRecipeSort.slice(
  perPages * (currentPage - 1),
  perPages * currentPage
);
console.log(recipesForThePage);
displayRecipes(recipesForThePage);
