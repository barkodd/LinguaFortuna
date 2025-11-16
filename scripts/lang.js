const savedLang = localStorage.getItem("lang");

if (savedLang && !window.location.pathname.includes(savedLang)) {
  window.location.href = `/index.${savedLang}.html`;
}

if (savedLang) {
  document.querySelector(".lang-popup").style.display = "none";
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelector(".lang-popup").style.display = "none";
  window.location.href = `/index.${lang}.html`;
}

document.getElementById("ukr").onclick = () => setLanguage("uk");
document.getElementById("eng").onclick = () => setLanguage("en");
document.getElementById("fr").onclick = () => setLanguage("fr");
