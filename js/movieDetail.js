let myMovie = JSON.parse(localStorage.getItem("movieDetail"));
console.log(myMovie);
let main = $("main");
let titleMovieDetail = $("<h1></h1>")
  .addClass("movie-title")
  .text(`Film : ${myMovie.title}`);
main.append(titleMovieDetail);
let container = $("<section></section>").addClass("container");
main.append(container);
let posterMovieContainer = $("<div></div>").addClass("container-poster");
let poster = $("<img/>")
  .attr({
    src: `https://image.tmdb.org/t/p/w500/${myMovie.poster_path}`,
    alt: myMovie.title,
  })
  .addClass("poster");
posterMovieContainer.append(poster);
container.append(posterMovieContainer);
let containerDetail = $("<div></div>").addClass("container-detail");
let resumeTitle = $("<h3></h3>").addClass("resume-title").text("résumé :");
let resumeText = $("<p></p>")
  .addClass("resume-text")
  .text(`${myMovie.overview}`);
let noteTitle = $("<h3></h3>").addClass("resume-title").text("Note :");
let noteBox = $("<div></div>").addClass("box-stars");
for (let i = 0; i < 5; i++) {
  let noteBoxStars = $("<div></div>").addClass("box-one-star");
  let noteStar = $("<img/>")
    .addClass("star")
    .attr({ src: "../assets/img/stars.png" });
  noteBoxStars.append(noteStar);
  noteBox.append(noteBoxStars);
}
containerDetail.append(resumeTitle);
containerDetail.append(resumeText);
containerDetail.append(noteBox);
container.append(containerDetail);
