let myFavorite = JSON.parse(localStorage.getItem("favorite"));
console.log(myFavorite);

if (myFavorite.length != 0) {
  myFavorite.forEach((element) => {
    if (element.name) {
      makingCard(element.poster_path, element.name, element.id, "tv");
      console.log(element.poster_path);
      console.log(element.name);
      console.log(element.id);
    } else {
      makingCard(element.poster_path, element.title, element.id, "movie");
      console.log("fonctionne");
    }
  });
}

//* gestion du click sur un film
$("body").on("click", ".card", function () {
  (async () => {
    let getType = localStorage.getItem("type");
    getType = "movie";
    localStorage.setItem("type", getType);
    let idCard = $(this).attr("value");
    let type = $(this).attr("type");
    getDetailMovie(idCard, type);
  })();
});
