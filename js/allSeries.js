// * Récupération des films
async function getSeries(page) {
  let Series = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
  const getSerie = await getData(Series);
  return getSerie.results;
}
(async () => {
  const pages = 10;
  const url = new URLSearchParams(location.search);
  let currentPage = parseInt(url.get("page")) || 1;
  console.log(currentPage);
  let previousPage = $("<a></a>")
    .text("Précédent")
    .attr({ class: "paging", href: `?page=${currentPage - 1}` });
  $("#paging").append(previousPage);
  for (let i = 1; i <= pages; i++) {
    let linkPage = $("<a></a>")
      .text(i)
      .attr({ class: "paging", href: `?page=${i}` });
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
}
(async () => {
  await getDetailSerie(13);
})();
