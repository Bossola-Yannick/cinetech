//* gestion du click sur un film
$("body").on("click", ".card", function () {
  (async () => {
    let idCard = $(this).attr("value");
    getDetailMovie(idCard);
  })();
});
//* gestion du click sur une serie
$("body").on("click", ".card", function () {
  (async () => {
    let idCard = $(this).attr("value");
    getDetailSerie(idCard);
  })();
});
