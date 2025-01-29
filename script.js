document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar nav ul li a");
  const contentTitle = document.querySelector(".content-title h1");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      
      contentTitle.textContent = this.textContent;

      navLinks.forEach((nav) => nav.classList.remove("active"));

      this.classList.add("active");
    });
  });
});
