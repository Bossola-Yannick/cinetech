let myClickDetail = JSON.parse(localStorage.getItem("detail"));
let similarTitle = JSON.parse(localStorage.getItem("similar"));
let inFavorite = localStorage.getItem("favorite") || [];
// let type = localStorage.getItem("type");
console.log(similarTitle);
console.log(myClickDetail);
let main = $("main");
// titre du film ou série
if (myClickDetail.title) {
  let titleMovieDetail = $("<h1></h1>")
    .addClass("movie-title")
    .text(`${myClickDetail.title}`);
  main.append(titleMovieDetail);
} else {
  let titleMovieDetail = $("<h1></h1>")
    .addClass("movie-title")
    .text(`${myClickDetail.name}`);
  main.append(titleMovieDetail);
}
// mise en place du container
let container = $("<section></section>").addClass("container");
main.append(container);
// mise en place du container de l'affiche
let posterMovieContainer = $("<div></div>").addClass("container-poster");
let poster = $("<img/>")
  .attr({
    src: `https://image.tmdb.org/t/p/w500/${myClickDetail.poster_path}`,
    alt: myClickDetail.title,
  })
  .addClass("poster");
posterMovieContainer.append(poster);
container.append(posterMovieContainer);
// mise en place du container des détail
let containerDetail = $("<div></div>").addClass("container-detail");
// mise en place zone favoris et note
let containerFavNote = $("<div></div>").addClass("container-favorite-note");
// mise en place du résumé
let resumeTitle = $("<h3></h3>").addClass("resume-title").text("Résumé :");
let resumeText = $("<p></p>")
  .addClass("resume-text")
  .text(`${myClickDetail.overview}`);
// mise en place favoris ou pas favoris
let favoriteBox = $("<div></div>").addClass("favorite-box no-favorite");
let favoriteImg = $("<img/>")
  .attr({ src: "../assets/img/no-favorite.png" })
  .addClass("favorite-image");
favoriteBox.append(favoriteImg);
containerFavNote.append(favoriteBox);
// mise en place de la note
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
containerFavNote.append(noteBox);
containerDetail.append(containerFavNote);
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

// mise en place des similaire
let titleSimilar = $("<h3></h3>")
  .addClass("resume-title")
  .text("Titre similaire :");
containerDetail.append(titleSimilar);
let allSimilarBox = $("<div></div>").addClass("similar-box");
for (let i = 0; i < 5; i++) {
  let similarBox = $("<div></div>").addClass("similar");
  let poster = similarTitle[i].poster_path;
  let similarImg = $("<img/>")
    .attr({
      src: `https://image.tmdb.org/t/p/w500/${poster}`,
      alt: `${similarTitle[i].title}`,
      value: `${similarTitle[i].id}`,
    })
    .addClass("similar-poster");
  similarBox.append(similarImg);
  allSimilarBox.append(similarBox);
}
containerDetail.append(allSimilarBox);

$("body").on("click", ".similar-poster", function () {
  (async () => {
    let idCard = $(this).attr("value");
    getDetailMovie(idCard);
  })();
});
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
  window.location.href = "../pages/detail.html";
}

// * Mise et retrait en favoris
let favorite = [];
const addFavorite = () => {
  $(".favorite-box").removeClass("no-favorite").addClass("favorite");
  $(".favorite-image").attr({ src: "../assets/img/favorite.png" });
  favorite = localStorage.getItem("favorite") || [];
  favorite.push(myClickDetail);
  localStorage.setItem("favorite", JSON.stringify(favorite));
};
const removeFavorite = () => {
  $(".favorite-box").removeClass("favorite").addClass("no-favorite");
  $(".favorite-image").attr({ src: "../assets/img/no-favorite.png" });
  favorite = JSON.parse(localStorage.getItem("favorite")) || [];
  favorite = favorite.filter((u) => u.id !== myClickDetail.id);
  localStorage.setItem("favorite", JSON.stringify(favorite));
};

for (let favorite of inFavorite) {
  if (favorite.id === myClickDetail.id) {
    $(".favorite-image").attr({ src: "../assets/img/favorite.png" });
  }
}

$("body").on("click", ".favorite-box", function () {
  if ($(".favorite-box").hasClass("no-favorite")) {
    addFavorite();
  } else if ($(".favorite-box").hasClass("favorite")) {
    removeFavorite();
  }
});
