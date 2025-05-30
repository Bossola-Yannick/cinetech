//! Routes des Series
// const getAllSeries = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
// let detailSeries = `https://api.themoviedb.org/3/tv/${idSerie}?language=fr-FR`;
// let similarSeries = `https://api.themoviedb.org/3/tv/${idSerie}/similar?language=fr-FR&page=1`;
//! Routes des Films
// const getAllMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=vote_count.desc`;
// let detailMovies = `https://api.themoviedb.org/3/movie/${idMovie}?language=fr-FR`;
// let similarMovies = `https://api.themoviedb.org/3/movie/${idMovie}/similar?language=fr-FR&page=1`;

// connexion API
const settings = {
  async: true,
  crossDomain: true,
  url: "https://api.themoviedb.org/3/authentication",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjJlZDc2YjUyYTk5MThiYTQ4N2MxMjE2OTdjOTg3OCIsIm5iZiI6MTc0NDYxODg4Ny4yNzQsInN1YiI6IjY3ZmNjNTg3NDM3ZjBiODBlZWFjZjI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kY1g51A7qyCTJLBkQPer1aVZmtwRFvmf5N97DqorA9Y",
  },
};
$.ajax(settings).done((res) => {});

// function d'appel des data de façon dynamique
const getData = (url) => {
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
  return new Promise((resolve, reject) => {
    $.ajax(settings)
      .done((res) => {
        resolve(res);
      })
      .fail((err) => {
        reject(err);
      });
  });
};
