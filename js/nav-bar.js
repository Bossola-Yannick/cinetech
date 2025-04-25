const burger = document.getElementById("burger");

burger.addEventListener("click", () => {
  console.log("coiucou");
  const header = document.getElementById("header-bar");
  const menu = document.getElementById("container-nav");
  const menuDisplay = menu.checkVisibility();

  const positionList = header.getBoundingClientRect();

  const containerHeight = header.offsetHeight;

  console.log(containerHeight);

  if (menuDisplay) {
    menu.style.display = "none";
    menu.classList.remove("burger-menu");
  } else {
    menu.style.display = "flex";
    menu.classList.add("burger-menu");
    menu.style.marginTop = `${containerHeight}px`;
  }
});
