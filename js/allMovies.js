// * Récupération des films
async function getMovie(page) {
  let Movies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
  const getMovie = await getData(Movies);
  return getMovie.results;
}
(async () => {
  // nombre de page limité
  const pages = 10;
  // récupération URL
  const url = new URLSearchParams(location.search);
  let currentPage = parseInt(url.get("page")) || 1;
  // mise en localStorage de la page en cour
  let stockPage = localStorage.getItem("currentPageMovie");
  stockPage = currentPage;
  localStorage.setItem("currentPageMovie", stockPage);
  // génération de la pagination
  let previousPage = $("<a></a>")
    .text("Précédent")
    .attr({ class: "paging", href: `?page=${currentPage - 1}` });
  $("#paging").append(previousPage);
  for (let i = 1; i <= pages; i++) {
    let linkPage = $("<a></a>")
      .text(i)
      .attr({ class: "paging", href: `?page=${i}` });
    if (i === currentPage) {
      linkPage.addClass("active");
    }
    $("#paging").append(linkPage);
  }
  const nextPage = $("<a></a>")
    .text("Suivant")
    .attr({ class: "paging", href: `?page=${currentPage + 1}` });
  if (currentPage === 1) {
    previousPage.text("").attr({ class: "disableLink" });
  }
  if (currentPage === pages) {
    nextPage.text("").attr({ class: "disableLink" });
  }
  $("#paging").append(nextPage);

  // affichage des films en fonction de la page actuelle
  const movies = await getMovie(currentPage);
  movies.forEach((element) => {
    makingCard(element.poster_path, element.title, element.id, "movie");
  });
})();

//* gestion du click sur un film
$("body").on("click", ".card", function () {
  (async () => {
    let getType = localStorage.getItem("type");
    getType = "movie";
    localStorage.setItem("type", getType);
    let idCard = $(this).attr("value");
    let type = $(this).attr("type");
    getDetailMovie(idCard, type);
  })();
});
