const inputSearch = document.getElementById("search");
const divSearchResult = document.querySelector(".search-result");

async function getSearch(searchBar) {
  let search = `https://api.themoviedb.org/3/search/multi?query=${searchBar}&include_adult=false&language=fr-FR&page=1`;
  let data = await getData(search);

  if (data && data.results) {
    divSearchResult.innerHTML = "";
    const dataMax = data.results.slice(0, 5);
    dataMax.forEach((result) => {
      const divResult = document.createElement("div");
      divResult.classList.add("results");
      const imgPoster = document.createElement("img");
      if (result.poster_path) {
        imgPoster.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500/${result.poster_path}`
        );
      } else if (result.backdrop_path) {
        imgPoster.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`
        );
      } else {
        imgPoster.setAttribute("src", "../assets/img/no-poster.jpg");
      }

      const pResult = document.createElement("p");
      if (result.title) {
        pResult.innerHTML = result.title;
      } else if (result.name) {
        pResult.innerHTML = result.name;
      }
      divResult.appendChild(imgPoster);
      divResult.appendChild(pResult);
      divSearchResult.appendChild(divResult);
    });
  }
}

inputSearch.addEventListener("input", (e) => {
  let searchBar = encodeURIComponent(e.target.value);
  console.log(searchBar);
  getSearch(searchBar);
});
