const getAllMovies =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=vote_count.desc";
const getAllSeries =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=vote_count.desc";
const trendingMovies =
  "https://api.themoviedb.org/3/trending/movie/week?language=fr-FR";
const trendingTV =
  "https://api.themoviedb.org/3/trending/tv/week?language=fr-FR";
let search = `https://api.themoviedb.org/3/search/multi?query=${inputSearch}&include_adult=false&language=fr-FR&page=1`;
let detailSeries = `https://api.themoviedb.org/3/tv/${idSerie}?language=fr-FR`;
let similarSeries = `https://api.themoviedb.org/3/tv/${idSerie}/similar?language=fr-FR&page=1`;
let detailMovies = `https://api.themoviedb.org/3/movie/${idMovie}?language=fr-FR`;
let similarMovies = `https://api.themoviedb.org/3/movie/${idMovie}/similar?language=fr-FR&page=1`;

const getdata = (url) => {
  const settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJlZDc2YjUyYTk5MThiYTQ4N2MxMjE2OTdjOTg3OCIsIm5iZiI6MTc0NDYxODg4Ny4yNzQsInN1YiI6IjY3ZmNjNTg3NDM3ZjBiODBlZWFjZjI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kY1g51A7qyCTJLBkQPer1aVZmtwRFvmf5N97DqorA9Y",
    },
  };

  $.ajax(settings).done((res) => {
    console.log(res);
  });
};

getdata();
