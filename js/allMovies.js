// * Récupération des films
async function getMovie(page) {
  let Movies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
  const getMovie = await getData(Movies);
  return getMovie.results;
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

  const movies = await getMovie(currentPage);
  movies.forEach((element) => {
    makingCard(element.poster_path, element.title, element.id);
  });
})();

// * Récupération des détail d'un films
async function getDetailMovie(id) {
  let detailMovies = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
  const getDetailMovie = await getData(detailMovies);
  //   console.log(getDetailMovie);
}
(async () => {
  await getDetailMovie(13);
})();
