//! initialisation des localStorage à mettre dans l'index.js
if (!localStorage.getItem("currentPageSerie")) {
  localStorage.setItem("currentPageSerie", 1);
}
if (!localStorage.getItem("detail")) {
  localStorage.setItem("detail", "");
}
// if (!localStorage.getItem("type")) {
//   localStorage.setItem("type", "");
// }
// * Récupération des films
async function getSeries(page) {
  let Series = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
  const getSerie = await getData(Series);
  return getSerie.results;
}
(async () => {
  // nombre de page limité
  const pages = 10;
  // récupération URL
  const url = new URLSearchParams(location.search);
  let currentPage = parseInt(url.get("page")) || 1;
  // mise en localStorage de la page en cour
  let stockPage = localStorage.getItem("currentPageSerie");
  stockPage = currentPage;
  localStorage.setItem("currentPageSerie", stockPage);
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
  const series = await getSeries(currentPage);
  console.log(series);
  series.forEach((element) => {
    makingCard(element.poster_path, element.title, element.id, "tv");
  });
})();

// * Récupération des détail d'une série
async function getDetailSerie(id, type) {
  let detailSeries = `https://api.themoviedb.org/3/${type}/${id}?language=fr-FR`;
  const getDetailSerie = await getData(detailSeries);
  let serieClick = localStorage.getItem("detail");
  serieClick = localStorage.setItem("detail", JSON.stringify(getDetailSerie));
  let similarSerie = `https://api.themoviedb.org/3/${type}/${id}/similar?language=fr-FR&page=1`;
  const getSimilarSerie = await getData(similarSerie);
  let similarClick = localStorage.getItem("similar");
  similarClick = localStorage.setItem(
    "similar",
    JSON.stringify(getSimilarSerie.results)
  );
  window.location.href = "./detail.html";
}
//* gestion du click sur une serie
$("body").on("click", ".card", function () {
  (async () => {
    let idCard = $(this).attr("value");
    let type = $(this).attr("type");
    getDetailSerie(idCard, type);
  })();
});
