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

function initMap() {
  const contentColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--content-color")
    .trim();
  const boxColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--box-color")
    .trim();

  const location1 = { lat: 48.71230833667956, lng: 2.1951999169797127 }; // Nano-INNOV
  const location2 = { lat: 48.71075248378351, lng: 2.2180446541432963 }; // ENSTA

  const map = new google.maps.Map(document.getElementById("custom-map"), {
    zoom: 14,
    center: location1,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: contentColor }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: boxColor }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: boxColor }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: boxColor }],
      },
    ],
  });

  const bounds = new google.maps.LatLngBounds();
  bounds.extend(location1);
  bounds.extend(location2);
  map.fitBounds(bounds);

  setTimeout(() => {
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-color")
      .trim();

    const accentColorEncoded = encodeURIComponent(accentColor);

    const customIcon = {
      url: `data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40' fill='${accentColorEncoded}'><path d='M12 2C8.13 2 5 5.13 5 9c0 4.25 5 11 7 13 2-2 7-8.75 7-13 0-3.87-3.13-7-7-7z'/></svg>`,
      scaledSize: new google.maps.Size(30, 30),
    };

    new google.maps.Marker({
      position: location1,
      map: map,
      icon: customIcon,
    });

    new google.maps.Marker({
      position: location2,
      map: map,
      icon: customIcon,
    });
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("4R081FyWEBktitRy0");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = {
        from_name: this.from_name.value,
        to_name: "Calvin",
        email: this.email.value,
        message: this.message.value,
      };

      emailjs
        .send("service_wbzgq5x", "template_6ftikvk", formData)
        .then(() => {
          alert("Email sent successfully!");
          this.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send. Check your EmailJS configuration.");
        });
    });
});
