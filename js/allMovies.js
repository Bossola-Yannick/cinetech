if (!localStorage.getItem("currentPageMovie")) {
  localStorage.setItem("currentPageMovie", 1);
}
if (!localStorage.getItem("detail")) {
  localStorage.setItem("detail", "");
}

// * Récupération des films
async function getMovie(page) {
  let Movies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
  const getMovie = await getData(Movies);
  console.log(getMovie);

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
  console.log(getDetailMovie);
  let movieClick = localStorage.getItem("detail");
  movieClick = localStorage.setItem("detail", JSON.stringify(getDetailMovie));
  window.location.href = "./detail.html";
}
