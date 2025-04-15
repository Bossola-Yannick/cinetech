const makingCard = () => {
  let card = $("<article></article>").addClass("card");
  let cardImg = $("<img/>").addClass("card-img").attr({
    src: "../assets/img/lastofus.webp",
    alt: "The Last Of Us",
  });
  card.append(cardImg);
  $("#container-movies").append(card);
};

makingCard();
makingCard();
