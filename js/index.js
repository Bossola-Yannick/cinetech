const rightArrow = document.querySelector(".arrows-right");
const leftArrow = document.querySelector(".arrows-left");

async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/week?language=fr-FR`;
  let data = await getData(trendingMovies);

  // création des affiches
  if (data && data.results) {
    data.results.forEach((movie) => {
      makingCard(movie.poster_path, movie.title, movie.id, "movies");
    });

    // carrousel
    const movieLists = document.getElementById("container-movies");
    const movieLenght = movieLists.querySelectorAll("article").length;
    const ratio = Math.floor(window.innerWidth / 302);

    // copie une partie des films pour un affichage "complet"
    let movieRatio = movieLenght % ratio;
    const moviesCopy = data.results.slice(0, ratio - movieRatio);
    if (movieRatio !== 0) {
      moviesCopy.forEach((copy) => {
        makingCard(copy.poster_path, copy.title, copy.id, "movies");
      });
    }

    const newLenght = movieLists.querySelectorAll("article").length;

    let click = 0;

    rightArrow.addEventListener("click", () => {
      click++;
      console.log(newLenght - ratio * click);
      // affichage fleche gauche
      if (click >= 1) {
        leftArrow.style.visibility = "visible";
      }

      // gestion click fleche droite

      if (newLenght - ratio * click > 0) {
        if (newLenght - ratio * click === ratio) {
          rightArrow.style.visibility = "hidden";
          movieLists.style.transform = `translateX(${
            movieLists.computedStyleMap().get("transform")[0].x.value -
            302 * ratio
          }px)`;
        } else {
          rightArrow.style.visibility = "visible";
          movieLists.style.transform = `translateX(${
            movieLists.computedStyleMap().get("transform")[0].x.value -
            302 * ratio
          }px)`;
        }
      } else {
        leftArrow.style.visibility = "hidden";
        click = 0;
      }
    });

    // gestion fleche gauche
    leftArrow.addEventListener("click", () => {
      if (newLenght - ratio * click > 0) {
        click--;
        rightArrow.style.visibility = "visible";
        movieLists.style.transform = `translateX(${
          movieLists.computedStyleMap().get("transform")[0].x.value +
          302 * ratio
        }px)`;

        if (click === 0) {
          leftArrow.style.visibility = "hidden";
        }
      }
    });
  } else {
    console.error("aucun film trouvé");
  }
}

getTrendingMovies();
