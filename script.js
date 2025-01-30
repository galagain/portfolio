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
  const timelineLine = document.querySelector(".timeline-line");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const sectionIcon = document.querySelector(".section-icon");

  function adjustContainerPosition() {
    if (!sidebar || !container) return;

    const sidebarHeight = sidebar.offsetHeight;
    const windowHeight = window.innerHeight;

    const newMarginTop = (windowHeight - sidebarHeight) / 2;
    container.style.marginTop = `${newMarginTop}px`;
    container.style.marginBottom = `${newMarginTop}px`;

    container.style.minHeight = `${sidebarHeight}px`;
  }

  function adjustTimelineHeight() {
    if (
      !timelineLine ||
      timelineItems.length === 0 ||
      timelineDots.length === 0 ||
      !sectionIcon
    )
      return;

    const iconHeight = sectionIcon.offsetHeight;
    const iconOffset = iconHeight / 2;

    const firstItem = timelineItems[0];
    const lastItem = timelineItems[timelineItems.length - 1];
    const lastDot = timelineDots[timelineDots.length - 1];

    const firstItemOffset = firstItem.offsetTop + firstItem.offsetHeight / 2;
    const lastItemOffset = lastDot.offsetTop + lastDot.offsetHeight / 2;

    timelineLine.style.top = `${firstItemOffset - iconOffset}px`;
    timelineLine.style.height = `${lastItemOffset - firstItemOffset}px`;

    timelineDots.forEach((dot, index) => {
      const itemTitle = timelineItems[index].querySelector(".timeline-title");
      if (itemTitle) {
        const titleOffset = itemTitle.offsetTop + itemTitle.offsetHeight / 2;
        dot.style.top = `${titleOffset}px`;
      }
    });
  }

  setTimeout(() => {
    adjustContainerPosition();
    adjustTimelineHeight();
  }, 100);

  window.addEventListener("resize", () => {
    adjustContainerPosition();
    adjustTimelineHeight();
  });
});
