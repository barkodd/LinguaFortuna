document.addEventListener("DOMContentLoaded", () => {
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("readMore");

  if (!moreText || !btnText) return; // Exit if elements not found

  // Detect page language
  const lang = document.documentElement.lang || "fr";
  const labels = {
    fr: { readMore: "En savoir plus", close: "Réduire" },
    en: { readMore: "Read more", close: "Close" },
    uk: { readMore: "Детальніше", close: "Закрити" },
  };

  function updateButtonText(open) {
    if (open) {
      btnText.textContent = labels[lang].close;
      moreText.classList.remove("hidden");
      moreText.classList.add("show");
    } else {
      btnText.textContent = labels[lang].readMore;
      moreText.classList.remove("show");
      moreText.classList.add("hidden");
    }
  }

  // Button click toggles the section
  btnText.addEventListener("click", () => {
    const isOpen = moreText.classList.contains("show");
    updateButtonText(!isOpen);
  });

  // Auto-open if link contains #about-us
  if (window.location.hash === "#about-us") {
    updateButtonText(true);
    document.getElementById("about-us").scrollIntoView({ behavior: "smooth" });
  }
});
