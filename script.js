const darkBtn = document.getElementById("butnDrk");
const lightBtn = document.getElementById("butnLgt");

window.addEventListener("load", () => darkMode());

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

function toggleModel(name, link) {
  model.innerHTML = "";
  console.log("length", link.length);
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
  input.disabled = true;
  input.name = "";
  input.id = "";

  // Create an i element
  // const i = document.createElement("i");
  // i.classList.add("fa", "fa-copy");

  // Append input and i elements to the div element
  div.appendChild(input);
  // div.appendChild(i);

  // Return the div element as an HTML string
  return div;
}

const personData = {
  name: "John Doe",
  email: "",
  phone: "1234567890",
};

const createVcard = () => {
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${personData.name}`,
    `EMAIL:${personData.email}`,
    `TEL;TYPE=CELL:${personData.phone}`,
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `${personData.name}.vcf`;
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
    <a href="https://${facebook}" class="image sm-icons">
      <i class="fa-brands fa-facebook-f" style="color: #7c56fe;"></i>
    </a>
  `;
}

// Check if Instagram ID is available
if (instagramID !== "") {
  socialMediaHTML += `
    <a href="https://${instagramID}" class="image sm-icons">
      <i class="fa-brands fa-instagram ins" style="color: #7c56fe;"></i>
    </a>
  `;
}

// Check if LinkedIn profile is available
if (linkedinProfile !== "") {
  socialMediaHTML += `
    <a href="https://${linkedinProfile}" class="image sm-icons">
      <i class="fa-brands fa-linkedin-in" style="color: #7c56fe;"></i>
    </a>
  `;
}

// Check if Twitter is available
if (twitter !== "") {
  socialMediaHTML += `
    <a href="https://${twitter}" class="image sm-icons">
      <i class="fa-brands fa-twitter" style="color: #7c56fe;"></i>
    </a>
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
    value: [
      "C7 , Block ",
      "PentaPark Appartment , Poothole , Thrissur",
      "680004",
    ],
  },
  {
    type: "Whatsapp",
    value: "1234672362",
  },
];

if(contactsData.length === 0) {
  document.getElementsByClassName("contacts-section")[0].style.display = "none";
}

const contactsIconsDiv = document.getElementById("contacts-icons");

contactsData.forEach((data) => {

      const button = createButton(data.type, data.value);
      contactsIconsDiv.appendChild(button);
});
function createButton(type, value) {
  const button = document.createElement("button");
  button.classList.add("image");

  const icon = document.createElement("i");
  if (type === "Phone Number") {
    icon.classList.add("fa-solid", "fa-phone");
    button.onclick = () => window.open(`tel:${value}`);
  } else if (type === "Email") {
    icon.classList.add("fa-solid", "fa-at");
    button.onclick = () => window.open(`mailto:${value}`);
  } else if (type === "Address") {
    icon.classList.add("fa-solid", "fa-location-dot");
    button.onclick = () => {
      toggleModel("Address", value);
    };
  } else if (type === "Whatsapp") {
    icon.classList.add("fa-brands", "fa-whatsapp");
    button.onclick = () => window.open(`https://wa.me/${value}`);
  }
  icon.style.color = "#7c56fe";

  button.appendChild(icon);

  return button;
}

// ---

// example data, replace with your own
const linksData = [
//   { name: "Link 1", url: "https://example.com/link1" },
//   { name: "Link 2", url: "https://example.com/link2" },
//   { name: "Link 3", url: "https://example.com/link3" },
];

if (linksData.length==0){
  document.getElementsByClassName("websites-section")[0].style.display="none";
}

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

// define an array of services
const services = [
  { title: "Service 1" },
  { title: "NFC" },
  { title: "Service Business" },
  { title: "NFC" },
  { title: "Service 1" },
  { title: "Service 1" },
  { title: "Service 1" },
  { title: "NFC" },
  { title: "Service Business" },
];

if (services.length==0){
  document.getElementsByClassName("services-section")[0].style.display="none";
}

// get the services-icons container
const servicesIcons = document.getElementById("services-icons");

// loop through the services array and dynamically create the service elements
services.forEach((service) => {
  const serviceElem = document.createElement("div");
  serviceElem.classList.add("service");
  const titleElem = document.createElement("p");
  titleElem.classList.add("s-title");
  titleElem.textContent = service.title;
  serviceElem.appendChild(titleElem);
  servicesIcons.appendChild(serviceElem);
});

// get the video container and iframe element
const videoContainer = document.querySelector(".embedding .video");
const videoFrame = videoContainer.querySelector("iframe");

// set the YouTube video URL
const youtubeUrl = "https://www.youtube.com/embed/N5wpD9Ov_To";

// set the src attribute of the iframe element
videoFrame.setAttribute("src", youtubeUrl);

// Define an array of products
const products = [
  {
    image: "path/to/image1.jpg",
    title: "Smart Business Card",
    subtitle: "INR 2000",
    buttonLabel: "Frame 101",
  },
  {
    image: "path/to/image2.jpg",
    title: "Smart Business Card",
    subtitle: "INR 2000",
    buttonLabel: "Frame 101",
  },
];

if (products.length==0){
  document.getElementsByClassName("products-section")[0].style.display="none";
}

// Get the products section container
const productsSection = document.getElementById("products-section");

// Create the products heading element
const productsHead = document.createElement("h3");
productsHead.classList.add("products-head", "head");
productsHead.textContent = "Products";

// Create the products icons container element
const productsIcons = document.createElement("div");
productsIcons.classList.add("products-icons");

// Loop through the products array and dynamically create the card elements
products.forEach((product) => {
  const cardElem = document.createElement("div");
  cardElem.classList.add("card");

  const cardImageElem = document.createElement("div");
  cardImageElem.classList.add("card-image");
  cardImageElem.style.backgroundImage = `url(${product.image})`;
  cardElem.appendChild(cardImageElem);

  const cardContentElem = document.createElement("div");
  cardContentElem.classList.add("card-content");
  cardElem.appendChild(cardContentElem);

  const cardTitleElem = document.createElement("h1");
  cardTitleElem.classList.add("card-title");
  cardTitleElem.textContent = product.title;
  cardContentElem.appendChild(cardTitleElem);

  const cardSubtitleElem = document.createElement("p");
  cardSubtitleElem.classList.add("card-subtitle");
  cardSubtitleElem.textContent = product.subtitle;
  cardContentElem.appendChild(cardSubtitleElem);

  const cardButtonElem = document.createElement("button");
  cardButtonElem.classList.add("card-button");
  cardButtonElem.textContent = product.buttonLabel;
  cardContentElem.appendChild(cardButtonElem);

  productsIcons.appendChild(cardElem);
});

// Add the elements to the products section container
productsSection.appendChild(productsHead);
productsSection.appendChild(document.createElement("hr"));
productsSection.appendChild(productsIcons);

// Define the bank details data as an object
const bankDetails = {
  name: "Jane Doe",
  accountNumber: "123456789",
  bankName: "Bank of America",
  branch: "New York",
  ifscCode: "123456789",
  swiftCode: "xxxxxxxxxxx",
  vatNumber: "123456789",
};


if (Object.values(bankDetails).every((val) => val === "")){
  document.getElementsByClassName("bank-section")[0].style.display="none";
}


// Get the bank details container element
const bankDetailsContainer = document.getElementById("bank-details");

// Create a function to dynamically render the bank details
function renderBankDetails() {
  // Check if all bank details are empty
  const isEmpty = Object.values(bankDetails).every((val) => val === "");
  if (isEmpty) {
    // If all bank details are empty, don't render anything
    bankDetailsContainer.innerHTML = "";
    return;
  }

  // Otherwise, create the bank details HTML dynamically
  let bankDetailsHTML = "";
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Name</p><p class="dtl">${bankDetails.name}</p></div><div class="bank-col"></div></div>`;
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Account Number</p><p class="dtl">${bankDetails.accountNumber}</p></div><div class="bank-col"><p class="dtl-head">Bank Name</p><p class="dtl">${bankDetails.bankName}</p></div></div>`;
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Branch</p><p class="dtl">${bankDetails.branch}</p></div><div class="bank-col"><p class="dtl-head">IFSC Code</p><p class="dtl">${bankDetails.ifscCode}</p></div></div>`;
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Swift Code</p><p class="dtl">${bankDetails.swiftCode}</p></div><div class="bank-col"><p class="dtl-head">VAT Number</p><p class="dtl">${bankDetails.vatNumber}</p></div></div>`;

  // Set the bank details container HTML to the dynamically generated HTML
  bankDetailsContainer.innerHTML = bankDetailsHTML;
}

// Call the renderBankDetails function to render the bank details
renderBankDetails();

if (email) {
  const emailInputs = document.querySelectorAll(
    '.enq-icons input[type="text"]'
  );
  const submitBtn = document.querySelector(".enq-icons .submit_btn");
  submitBtn.addEventListener("click", () => {
    const name = emailInputs[0].value;
    const email = emailInputs[1].value;
    const phone = emailInputs[2].value;
    const subject = emailInputs[3].value;
    const mailtoLink = `mailto:${email}?subject=${subject}&body=Name: ${name}%0APhone: ${phone}`;
    window.location.href = mailtoLink;
  });
} else {
  const enqSection = document.querySelector(".enq-section");
  enqSection.style.display = "none";
}

const awardsData = [
  {
    name: "Award 1",
    authority: "Authority 1",
  },
  {
    name: "Award 2",
    authority: "Authority 2",
  },
  {
    name: "Award 3",
    authority: "Authority 3",
  },
];

if (awardsData.length === 0) {
  document.getElementsByClassName("awards-section")[0].style.display = "none";
}

const awardCardsDiv = document.getElementById("award-cards");

awardsData.forEach((award) => {
  const card = createAwardCard(award);
  awardCardsDiv.appendChild(card);
});

function createAwardCard(award) {
  const card = document.createElement("div");
  card.classList.add("award_card");

  const name = document.createElement("h3");
  name.textContent = award.name;
  card.appendChild(name);

  const authority = document.createElement("p");
  authority.textContent = award.authority;
  card.appendChild(authority);

  return card;
}

// define an array of services
const certif = [
  { title: "Service 1", awardName: "Award 1", awardAuthority: "Authority 1" },
];

if (certif.length === 0) {
  document.getElementsByClassName("certif-section")[0].style.display = "none";
}

// get the services-icons container
const certifIcons = document.getElementById("certif-icons");

// loop through the services array and dynamically create the service elements
certif.forEach((service) => {
  const serviceElem = document.createElement("div");
  serviceElem.classList.add("service");
  const titleElem = document.createElement("p");
  titleElem.classList.add("s-title");
  titleElem.textContent = service.title;
  serviceElem.appendChild(titleElem);
  certifIcons.appendChild(serviceElem);
  serviceElem.addEventListener("click", () =>
    toggleModel("Certificate", [service.awardName, service.awardAuthority])
  );
});


const saveContactBtn = document.getElementById("save-contact");
saveContactBtn.addEventListener("click", () => {
  createVcard();
})