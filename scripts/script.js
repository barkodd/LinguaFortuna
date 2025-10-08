function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMore");

  if (moreText.classList.contains("show")) {
    // згортаємо
    dots.style.display = "inline";
    btnText.innerHTML = "En savoir plus";
    moreText.classList.remove("show");
  } else {
    // розгортаємо
    dots.style.display = "none";
    btnText.innerHTML = "Réduire";
    moreText.classList.add("show");
  }
}
