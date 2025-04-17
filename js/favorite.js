let myFavorite = JSON.parse(localStorage.getItem("favorite"));
console.log(myFavorite);

if (myFavorite.length != 0) {
  myFavorite.forEach((element) => {
    makingCard(element.poster_path, element.title, element.id);
  });
} else {
  console.log("aucun favoris trouvé");
}
