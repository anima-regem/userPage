const darkBtn = document.getElementById("butnDrk");
const lightBtn = document.getElementById("butnLgt");

// swap style css file to styleDark
function swapStyleSheet(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

// Dark Mode
darkBtn.onclick = function () {
  swapStyleSheet("styleDark.css");
};

// Light Mode
lightBtn.onclick = function () {
  swapStyleSheet("style.css");
};
