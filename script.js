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
  console.log("length",link.length);
  const h1 = document.createElement("h1");
  h1.classList.add("model_heading");
  h1.innerHTML = name;

  model.appendChild(h1);
  console.log(link);
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

// setup dynamic data from backend

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const website = document.getElementById("website");
const position = document.getElementById("position");
const company = document.getElementById("company");
const bio = document.getElementById("bio");

// ----

// Check if social media data is available
const instagramID = "www.instagram.com/lorem/";
const linkedinProfile = "";
const twitter = "www.Twitter.com/lorem/";
const facebook = "www.facebook.com/lorem/";

// Create an empty HTML string
let socialMediaHTML = "";

// Check if Facebook is available
if (facebook !== "") {
  socialMediaHTML += `
    <button onclick="toggleModel('Facebook',['${facebook}'])" class="image">
      <i class="fa-brands fa-facebook-f" style="color: #7c56fe;"></i>
    </button>
  `;
}

// Check if Instagram ID is available
if (instagramID !== "") {
  socialMediaHTML += `
    <button onclick="toggleModel('Instagram ID',['${instagramID}'])" class="image">
      <i class="fa-brands fa-instagram" style="color: #7c56fe;"></i>
    </button>
  `;
}

// Check if LinkedIn profile is available
if (linkedinProfile !== "") {
  socialMediaHTML += `
    <button onclick="toggleModel('LinkedIn Profile',['${linkedinProfile}'])" class="image">
      <i class="fa-brands fa-linkedin-in" style="color: #7c56fe;"></i>
    </button>
  `;
}

// Check if Twitter is available
if (twitter !== "") {
  socialMediaHTML += `
    <button onclick="toggleModel('Twitter',['${twitter}'])" class="image">
      <i class="fa-brands fa-twitter" style="color: #7c56fe;"></i>
    </button>
  `;
}

// If no social media data is available, show a message
if (socialMediaHTML === "") {
  socialMediaHTML = "<p>No social media data available.</p>";
}

// Render the social media section
const socialMediaSection = document.getElementById("social-media-section");
socialMediaSection.innerHTML = `
  <div class="sm-section section">
    <h3 class="sm-head head">Social Media</h3>
    <hr />
    <div class="sm-icons">
      ${socialMediaHTML}
    </div>
  </div>
`;

// ---

const data = ["123, Elite street, Bangalore.", "Lorem ipsum", "xxxxxx"]
console.log(data.length)

const contactsData = [
  {
    type: "Phone Number",
    value: "9265730149",
  },
  {
    type: "Email",
    value: ["example@gmail.com"],
  },
  {
    type: "Address",
    value: ["123, Elite street, Bangalore.", "Lorem ipsum", "xxxxxx"],
  },
  {
    type: "Whatsapp",
    value: "example@gmail.com",
  },
];

const contactsIconsDiv = document.getElementById("contacts-icons");

contactsData.forEach((data) => {
  if (Array.isArray(data.value)) {
    if (data.value.length > 0) {
      const button = createButton(data.type, data.value.join(", "));
      contactsIconsDiv.appendChild(button);
    }
  } else {
    if (data.value !== "") {
      const button = createButton(data.type, data.value);
      contactsIconsDiv.appendChild(button);
    }
  }
});

function createButton(type, value) {
  const button = document.createElement("button");
  button.onclick = () => toggleModel(type, [value]);
  button.classList.add("image");

  const icon = document.createElement("i");
  if (type === "Phone Number") {
    icon.classList.add("fa-solid", "fa-phone");
  } else if (type === "Email") {
    icon.classList.add("fa-solid", "fa-at");
  } else if (type === "Address") {
    icon.classList.add("fa-solid", "fa-location-dot");
  } else if (type === "Whatsapp") {
    icon.classList.add("fa-brands", "fa-whatsapp");
  }
  icon.style.color = "#7c56fe";

  button.appendChild(icon);

  return button;
}

// ---

// example data, replace with your own
const linksData = [
  { name: "Link 1", url: "https://example.com/link1" },
  { name: "Link 2", url: "https://example.com/link2" },
  { name: "Link 3", url: "https://example.com/link3" },
];

// function to generate link card HTML for a single link
function generateLinkCard(linkData) {
  return `
    <div class="link-card">
      <p class="link">${linkData.name}</p>
      <button class="image" onclick="window.open('${linkData.url}', '_blank')">
        <img src="arrow_outward.svg" alt="" class="arrow">
      </button>
    </div>
  `;
}

// generate link cards based on available data
const websitesContainer = document.getElementById("websites-container");
if (linksData.length > 0) {
  const linkCardsHtml = linksData
    .map((linkData) => generateLinkCard(linkData))
    .join("");
  websitesContainer.innerHTML = linkCardsHtml;
}
