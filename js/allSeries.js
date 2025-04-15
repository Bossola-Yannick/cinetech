if (!localStorage.getItem("currentPageSerie")) {
  localStorage.setItem("currentPageSerie", 1);
}
if (!localStorage.getItem("serieDetail")) {
  localStorage.setItem("serieDetail", "");
}

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
    makingCard(element.poster_path, element.title, element.id);
  });
})();

// * Récupération des détail d'un films
async function getDetailSerie(id) {
  let detailSeries = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
  const getDetailSerie = await getData(detailSeries);
  console.log(getDetailSerie);
  let movieClick = localStorage.getItem("serieDetail");
  movieClick = localStorage.setItem(
    "serieDetail",
    JSON.stringify(getDetailSerie)
  );
  window.location.href = "./serieDetail.html";
}
