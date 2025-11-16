(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // ------------------------
    // Popup Handling
    // ------------------------
    const popup = document.querySelector(".lang-popup");
    const savedLang = localStorage.getItem("lang");

    if (savedLang && popup) {
      popup.style.display = "none";
    }

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
      if (btn) btn.addEventListener("click", () => setLanguage(lang));
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
    // Dropdown toggle for desktop
    // ------------------------
    const langToggle = document.getElementById("lang-toggle");
    const langMenu = document.querySelector(".lang-menu");

    if (langToggle && langMenu) {
      // Check if mobile: viewport < 900px
      const isMobile = window.innerWidth < 900;

      if (isMobile) {
        // Mobile: always show buttons
        langMenu.classList.remove("hidden");
        langMenu.style.opacity = 1;
        langMenu.style.transform = "translateX(0)";
        langMenu.style.transition = "none";
      } else {
        // Desktop: toggle dropdown
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
              if (langMenu.style.opacity === "0")
                langMenu.classList.add("hidden");
            },
            { once: true }
          );
        };

        langToggle.addEventListener("click", (e) => {
          e.stopPropagation();
          if (langMenu.classList.contains("hidden")) {
            showMenu();
          } else {
            hideMenu();
          }
        });

        document.addEventListener("click", () => {
          if (!langMenu.classList.contains("hidden")) hideMenu();
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && !langMenu.classList.contains("hidden"))
            hideMenu();
        });
      }
    }
  });
})();
