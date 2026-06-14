document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".gallery-container");

  sliders.forEach((slider) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const stopDragging = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");

      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
    });

    // IMPORTANT: mouseup on WINDOW so it always triggers
    window.addEventListener("mouseup", stopDragging);

    slider.addEventListener("mouseleave", stopDragging);

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX;
      const walk = (x - startX) * 2;

      slider.scrollLeft = scrollLeft - walk;
    });
  });
});