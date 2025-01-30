document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar nav ul li a");
  const contentTitle = document.querySelector(".content-title h1");
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => section.classList.add("hidden"));
  document.querySelector(".about").classList.remove("hidden");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const sectionClass = this.textContent.trim().toLowerCase();

      contentTitle.textContent =
        this.textContent.trim() === "About" ? "About Me" : this.textContent;

      sections.forEach((section) => section.classList.add("hidden"));

      const activeSection = document.querySelector(`.${sectionClass}`);
      if (activeSection) {
        activeSection.classList.remove("hidden");
      }

      navLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const container = document.querySelector(".container");

  function adjustContainerPosition() {
    const sidebarHeight = sidebar.offsetHeight;
    const windowHeight = window.innerHeight;

    const newMarginTop = (windowHeight - sidebarHeight) / 2;
    container.style.marginTop = `${newMarginTop}px`;
    container.style.marginBottom = `${newMarginTop}px`;

    container.style.minHeight = `${sidebarHeight}px`;
  }

  adjustContainerPosition();
  window.addEventListener("resize", adjustContainerPosition);
});
