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

//* gestion du click sur une serie
$("body").on("click", ".card", function () {
  (async () => {
    let getType = localStorage.getItem("type");
    getType = "tv";
    localStorage.setItem("type", getType);
    let idCard = $(this).attr("value");
    let type = $(this).attr("type");
    getDetailMovie(idCard, type);
  })();
});
