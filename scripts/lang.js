(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // ------------------------
    // Popup Handling
    // ------------------------
    const popup = document.querySelector(".lang-popup");
    const savedLang = localStorage.getItem("lang");

    // Hide popup if language already saved
    if (savedLang && popup) {
      popup.style.display = "none";
    }

    /**
     * Set or override the selected language
     * @param {string} lang - Language code ('uk', 'en', 'fr')
     */
    function setLanguage(lang) {
      if (!lang) return;

      localStorage.setItem("lang", lang);

      if (popup) popup.style.display = "none";

      const currentPage = window.location.pathname.split("/").pop();
      const targetPage = `index.${lang}.html`;
      if (!currentPage.includes(targetPage)) {
        window.location.href = targetPage;
      }
    }

    // ------------------------
    // Popup buttons
    // ------------------------
    const popupButtons = [
      { id: "ukr", lang: "uk" },
      { id: "eng", lang: "en" },
      { id: "fr", lang: "fr" },
    ];

    popupButtons.forEach(({ id, lang }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => setLanguage(lang));
      }
    });

    // ------------------------
    // Navbar dropdown buttons
    // ------------------------
    const dropdownButtons = document.querySelectorAll(".change-lang");
    dropdownButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        setLanguage(lang);
      });
    });

    // ------------------------
    // Dropdown toggle with slide/fade animation
    // ------------------------
    const langToggle = document.getElementById("lang-toggle");
    const langMenu = document.querySelector(".lang-menu");

    if (langToggle && langMenu) {
      // Initially hide the dropdown
      langMenu.style.opacity = 0;
      langMenu.style.transform = "translateX(-10px)";
      langMenu.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      langMenu.classList.add("hidden");

      const showMenu = () => {
        langMenu.classList.remove("hidden");
        requestAnimationFrame(() => {
          langMenu.style.opacity = 1;
          langMenu.style.transform = "translateX(0)";
        });
      };

      const hideMenu = () => {
        langMenu.style.opacity = 0;
        langMenu.style.transform = "translateX(-10px)";
        langMenu.addEventListener(
          "transitionend",
          () => {
            if (langMenu.style.opacity === "0") {
              langMenu.classList.add("hidden");
            }
          },
          { once: true }
        );
      };

      // Toggle dropdown on button click
      langToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (langMenu.classList.contains("hidden")) {
          showMenu();
        } else {
          hideMenu();
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        if (!langMenu.classList.contains("hidden")) {
          hideMenu();
        }
      });

      // Close dropdown with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !langMenu.classList.contains("hidden")) {
          hideMenu();
        }
      });
    }
  });
})();
