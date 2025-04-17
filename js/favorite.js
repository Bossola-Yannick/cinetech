let myFavorite = JSON.parse(localStorage.getItem("favorite"));
console.log(myFavorite);

if (myFavorite.length != 0) {
  myFavorite.forEach((element) => {
    if (element.name) {
      makingCard(element.poster_path, element.title, element.id, "tv");
    } else makingCard(element.poster_path, element.title, element.id, "movie");
  });
} else {
  console.log("aucun favoris trouvé");
}
