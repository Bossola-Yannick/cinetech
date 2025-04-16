//! initialisation des localStorage à mettre dans l'index.js
if (!localStorage.getItem("currentPageMovie")) {
  localStorage.setItem("currentPageMovie", 1);
}
if (!localStorage.getItem("detail")) {
  localStorage.setItem("detail", "");
}
if (!localStorage.getItem("similar")) {
  localStorage.setItem("similar", "");
}
if (!localStorage.getItem("type")) {
  localStorage.setItem("type", "");
}
if (!localStorage.getItem("favorite")) {
  localStorage.setItem("favorite", []);
}

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
    makingCard(element.poster_path, element.title, element.id);
  });
})();

// * Récupération des détail d'un films
async function getDetailMovie(id) {
  let detailMovies = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
  const getDetailMovie = await getData(detailMovies);
  let movieClick = localStorage.getItem("detail");
  movieClick = localStorage.setItem("detail", JSON.stringify(getDetailMovie));
  let similarMovies = `https://api.themoviedb.org/3/movie/${id}/similar?language=fr-FR&page=1`;
  const getSimilarMovie = await getData(similarMovies);
  let similarClick = localStorage.getItem("similar");
  similarClick = localStorage.setItem(
    "similar",
    JSON.stringify(getSimilarMovie.results)
  );
  let type = localStorage.getItem("type");
  type = localStorage.setItem("type", "movie");
  window.location.href = "./detail.html";
}

//* gestion du click sur un film
$("body").on("click", ".card", function () {
  (async () => {
    let idCard = $(this).attr("value");
    getDetailMovie(idCard);
  })();
});
