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
