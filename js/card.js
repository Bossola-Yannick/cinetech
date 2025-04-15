const makingCard = (img, title, idCard) => {
  let card = $("<article></article>")
    .addClass("card")
    .attr({ value: `${idCard}` });
  let cardImg = $("<img/>")
    .addClass("card-img")
    .attr({
      src: `https://image.tmdb.org/t/p/w500/${img}`,
      alt: title,
    });
  card.append(cardImg);
  $("#container-movies").append(card);
  $("#container-series").append(card);
};
