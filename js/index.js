const rightArrow = document.querySelector(".arrows-right");
// const leftArrow = document.querySelector(".arrows-left");

async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/week?language=fr-FR`;
  let data = await getData(trendingMovies);

  // création des affiches
  if (data && data.results) {
    data.results.forEach((movie) => {
      makingCard(movie.poster_path, movie.title, movie.id);
    });

    // carrousel
    const movieLists = document.getElementById("container-movies");
    const movie = movieLists.querySelectorAll("article").length;

    let click = 0;
    rightArrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 302);
      click++;

      if (movie - ratio * click >= 0) {
        movieLists.style.transform = `translateX(${
          movieLists.computedStyleMap().get("transform")[0].x.value -
          302 * ratio
        }px)`;
      } else {
        movieLists.style.transform = "translateX(0)";
        click = 0;
      }
    });
  } else {
    console.error("aucun film trouvé");
  }
}

getTrendingMovies();
