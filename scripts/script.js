function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMore");

  if (moreText.classList.contains("show")) {
    dots.style.display = "inline";
    btnText.innerHTML = "En savoir plus";
    moreText.classList.remove("show");
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Réduire";
    moreText.classList.add("show");
  }
}
