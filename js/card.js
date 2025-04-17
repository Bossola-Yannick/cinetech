const makingCard = (img, title, idCard, type) => {
  let card = $("<article></article>")
    .addClass("card")
    .attr({ value: `${idCard}`, type: `${type}` });
  let cardImg = $("<img/>")
    .addClass("card-img")
    .attr({
      src: `https://image.tmdb.org/t/p/w500/${img}`,
      alt: title,
    });
  card.append(cardImg);

  if (type === "movie") {
    $("#container-movies").append(card);
  } else if (type === "tv") {
    $("#container-series").append(card);
  }
};
