// Toggle mobile menu
const burgerToggle = document.getElementById("burgerToggle");
const navLinks = document.querySelector(".nav-links");

burgerToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});