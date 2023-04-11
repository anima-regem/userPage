const darkBtn = document.getElementById("butnDrk");
const lightBtn = document.getElementById("butnLgt");

window.addEventListener("load", () => lightMode());

const darkMode = () => {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
  darkBtn.style.display = "none";
  lightBtn.style.display = "block";
};
const lightMode = () => {
  document.documentElement.classList.add("light");
  document.documentElement.classList.remove("dark");
  darkBtn.style.display = "block";
  lightBtn.style.display = "none";
};

const model_container = document.querySelector(".model_container");
const model = document.querySelector("#model");

function toggleModel(name, link, isLink) {
  model.innerHTML = "";
  console.log(link.length);
  const h1 = document.createElement("h1");
  h1.classList.add("model_heading");
  h1.innerHTML = name;

  model.appendChild(h1);

  link.forEach((item) => {
    var datacard = inputCard(item);
    model.appendChild(datacard);
    console.log(datacard);
  });
  model_container.classList.add("show");
}

function hideModel() {
  model_container.classList.remove("show");
}

function inputCard(data) {
  // Create a div element
  const div = document.createElement("div");
  div.classList.add("input_section");

  // Create an input element
  const input = document.createElement("input");
  input.classList.add("model_input");
  input.type = "text";
  input.value = data;
  input.name = "";
  input.id = "";

  // Create an i element
  const i = document.createElement("i");
  i.classList.add("fa", "fa-copy");

  // Append input and i elements to the div element
  div.appendChild(input);
  div.appendChild(i);

  // Return the div element as an HTML string
  return div;
}

const createVcard = () => {
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Doe;John;;Mr.;",
    "FN:John Doe",
    "EMAIL:john.doe@example.com",
    "TEL;TYPE=CELL:(123) 555-4567",
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "contact.vcf";
  downloadLink.click();

  // Release the object URL after the download has started
  URL.revokeObjectURL(url);
};
