async function getTrendingMovies() {
  const trendingMovies = `https://api.themoviedb.org/3/trending/movie/week?language=fr-FR`;
  let data = await getData(trendingMovies);
  if (data && data.results) {
    console.log(data);
    data.results.forEach((movie) => {
      //   console.log(movie.id);
      makingCard(movie.poster_path, movie.title, movie.id);
    });
  } else {
    console.error("Les données retournées ne contiennent pas de films.");
  }
}

getTrendingMovies();
