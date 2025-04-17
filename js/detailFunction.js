// * Récupération des détail d'un films
async function getDetailMovie(id, type) {
  let detailMovies = `https://api.themoviedb.org/3/${type}/${id}?language=fr-FR`;
  const getDetailMovie = await getData(detailMovies);
  let movieClick = localStorage.getItem("detail");
  movieClick = localStorage.setItem("detail", JSON.stringify(getDetailMovie));
  let similarMovies = `https://api.themoviedb.org/3/${type}/${id}/similar?language=fr-FR&page=1`;
  const getSimilarMovie = await getData(similarMovies);
  let similarClick = localStorage.getItem("similar");
  similarClick = localStorage.setItem(
    "similar",
    JSON.stringify(getSimilarMovie.results)
  );
  window.location.href = "./pages/detail.html";
}
