//! initialisation des localStorage à mettre dans l'index.js
if (!localStorage.getItem("currentPageMovie")) {
  localStorage.setItem("currentPageMovie", 1);
}
if (!localStorage.getItem("detail")) {
  localStorage.setItem("detail", "");
}
if (!localStorage.getItem("similar")) {
  localStorage.setItem("similar", "");
}
if (!localStorage.getItem("favorite")) {
  localStorage.setItem("favorite", JSON.stringify([]));
}
if (!localStorage.getItem("type")) {
  localStorage.setItem("type", "");
}

async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/week?language=fr-FR`;
  let data = await getData(trendingMovies);

  if (data && data.results) {
    data.results.forEach((movie) => {
      makingCard(movie.poster_path, movie.title, movie.id, "movie");
    });

    const movieLists = document.getElementById("container-movies");
    const movieLength = movieLists.querySelectorAll("article").length;
    const ratio = Math.floor(window.innerWidth / 302);

    let movieRatio = movieLength % ratio;
    const moviesCopy = data.results.slice(0, ratio - movieRatio);
    if (movieRatio !== 0) {
      moviesCopy.forEach((copy) => {
        makingCard(copy.poster_path, copy.title, copy.id, "movie");
      });
    }

    const newLength = movieLists.querySelectorAll("article").length;
    const newMovieList = movieLists.querySelectorAll("article");
    newMovieList.forEach((movie) => {
      movie.addEventListener("click", () => {
        const type = movie.getAttribute("type");
        let localStorageType = localStorage.getItem("type");
        localStorageType = type;
        localStorage.setItem("type", localStorageType);
        const id = movie.getAttribute("value");
        getDetailMovie(id, type);
      });
    });
    let click = 0;

    const rightArrow = document.querySelector(".arrows-right.movies-arrow");
    const leftArrow = document.querySelector(".arrows-left.movies-arrow");

    rightArrow.addEventListener("click", () => {
      click++;
      if (click >= 1) {
        leftArrow.style.visibility = "visible";
      }

      if (newLength - ratio * click > 0) {
        movieLists.style.transform = `translateX(${
          movieLists.computedStyleMap().get("transform")[0].x.value -
          302 * ratio
        }px)`;

        if (newLength - ratio * click <= ratio) {
          rightArrow.style.visibility = "hidden";
        }
      } else {
        leftArrow.style.visibility = "hidden";
        click = 0;
      }
    });

    leftArrow.addEventListener("click", () => {
      if (click > 0) {
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

async function getTrendingSeries() {
  const trendingTV = `https://api.themoviedb.org/3/trending/tv/week?language=fr-FR`;
  let data = await getData(trendingTV);

  if (data && data.results) {
    data.results.forEach((serie) => {
      makingCard(serie.poster_path, serie.title, serie.id, "tv");
    });

    const serieLists = document.getElementById("container-series");
    const serieLength = serieLists.querySelectorAll("article").length;
    const ratio = Math.floor(window.innerWidth / 302);

    let serieRatio = serieLength % ratio;
    const seriesCopy = data.results.slice(0, ratio - serieRatio);
    if (serieRatio !== 0) {
      seriesCopy.forEach((copy) => {
        makingCard(copy.poster_path, copy.title, copy.id, "tv");
      });
    }

    const newLength = serieLists.querySelectorAll("article").length;

    // Evenement click
    const newSerieList = serieLists.querySelectorAll("article");
    newSerieList.forEach((serie) => {
      serie.addEventListener("click", () => {
        const type = serie.getAttribute("type");
        let localStorageType = localStorage.getItem("type");
        localStorageType = type;
        localStorage.setItem("type", localStorageType);
        const id = serie.getAttribute("value");
        getDetailMovie(id, type);
      });
    });

    // Evenements slide
    let click = 0;
    const rightArrow = document.querySelector(".arrows-right.series-arrow");
    const leftArrow = document.querySelector(".arrows-left.series-arrow");

    rightArrow.addEventListener("click", () => {
      click++;
      if (click >= 1) {
        leftArrow.style.visibility = "visible";
      }

      if (newLength - ratio * click > 0) {
        serieLists.style.transform = `translateX(${
          serieLists.computedStyleMap().get("transform")[0].x.value -
          302 * ratio
        }px)`;

        if (newLength - ratio * click <= ratio) {
          rightArrow.style.visibility = "hidden";
        }
      } else {
        leftArrow.style.visibility = "hidden";
        click = 0;
      }
    });

    leftArrow.addEventListener("click", () => {
      if (click > 0) {
        click--;
        rightArrow.style.visibility = "visible";
        serieLists.style.transform = `translateX(${
          serieLists.computedStyleMap().get("transform")[0].x.value +
          302 * ratio
        }px)`;

        if (click === 0) {
          leftArrow.style.visibility = "hidden";
        }
      }
    });
  } else {
    console.error("aucune série trouvée");
  }
}

getTrendingMovies();
getTrendingSeries();
