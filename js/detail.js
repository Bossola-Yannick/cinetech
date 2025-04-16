let myClickDetail = JSON.parse(localStorage.getItem("detail"));
console.log(myClickDetail);
let main = $("main");
let titleMovieDetail = $("<h1></h1>")
  .addClass("movie-title")
  .text(`Film : ${myClickDetail.title}`);
main.append(titleMovieDetail);
let container = $("<section></section>").addClass("container");
main.append(container);
let posterMovieContainer = $("<div></div>").addClass("container-poster");
let poster = $("<img/>")
  .attr({
    src: `https://image.tmdb.org/t/p/w500/${myClickDetail.poster_path}`,
    alt: myClickDetail.title,
  })
  .addClass("poster");
posterMovieContainer.append(poster);
container.append(posterMovieContainer);
let containerDetail = $("<div></div>").addClass("container-detail");
let resumeTitle = $("<h3></h3>").addClass("resume-title").text("Résumé :");
let resumeText = $("<p></p>")
  .addClass("resume-text")
  .text(`${myClickDetail.overview}`);
let noteTitle = $("<h3></h3>").addClass("note-title").text("Note :");
let noteBox = $("<div></div>").addClass("box-stars");
noteBox.append(noteTitle);
for (let i = 0; i < 5; i++) {
  let noteBoxStars = $("<div></div>").addClass("box-one-star");
  let noteStar = $("<img/>")
    .addClass("star")
    .attr({ src: "../assets/img/stars.png" });
  noteBoxStars.append(noteStar);
  noteBox.append(noteBoxStars);
}
containerDetail.append(noteBox);
containerDetail.append(resumeTitle);
containerDetail.append(resumeText);
container.append(containerDetail);

// * Gewtion de la note
let note = Math.floor(myClickDetail.vote_average);
if (note > 1) {
  let thisStar = $(".box-stars .box-one-star").eq(0).find(".star");
  thisStar.attr({ src: "../assets/img/stars-gold.png" });
}
if (note >= 3) {
  let thisStar = $(".box-stars .box-one-star").eq(1).find(".star");
  thisStar.attr({ src: "../assets/img/stars-gold.png" });
}
if (note >= 5) {
  let thisStar = $(".box-stars .box-one-star").eq(2).find(".star");
  thisStar.attr({ src: "../assets/img/stars-gold.png" });
}
if (note >= 7) {
  let thisStar = $(".box-stars .box-one-star").eq(3).find(".star");
  thisStar.attr({ src: "../assets/img/stars-gold.png" });
}
if (note >= 9) {
  let thisStar = $(".box-stars .box-one-star").eq(4).find(".star");
  thisStar.attr({ src: "../assets/img/stars-gold.png" });
}

// * Récupération des résultat similaire
let movieId = myClickDetail.id;
async function getSimilarMovie(idMovie) {
  let similarMovies = `https://api.themoviedb.org/3/movie/${idMovie}/similar?language=fr-FR&page=1`;
  const getDetailMovie = await getData(similarMovies);
  return getDetailMovie;
}
(async () => {
  const similar = await getSimilarMovie(movieId);
  console.log(similar);
})();
