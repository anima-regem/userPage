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

function toggleModel(name, link, copy = false) {
  model.innerHTML = "";
  console.log("length", link.length);
  const h1 = document.createElement("h1");
  h1.classList.add("model_heading");
  h1.innerHTML = name;

  model.appendChild(h1);
  console.log(link);
  link.forEach((item) => {
    var datacard = inputCard(item, (copy = true));
    model.appendChild(datacard);
    console.log(datacard);
  });
  model_container.classList.add("show");
}

function hideModel() {
  model_container.classList.remove("show");
}

function inputCard(data, copy = false) {
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

  div.appendChild(input);
  if (copy) {
    const i = document.createElement("i");
    i.addEventListener("click", () => {
      copyToClipboard(data);
    });
    i.classList.add("fa", "fa-copy");
    div.appendChild(i);
  }
  // Create an i element

  // Append input and i elements to the div element

  // Return the div element as an HTML string
  return div;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return; //codes below wont be executed
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  document.execCommand("copy");

  document.body.removeChild(textArea);
}

const personData = {
  name: "John Doe",
  email: "SDFJASKDJN#SDKFNDFK",
  company: "Company Name",
  position: "Position Name",
  address: "123 Main St, City, State, 12345",
  phone: "1234567890",
};

const createVcard = () => {
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${personData.name}`,
    `EMAIL;TYPE=WORK:${personData.email}`,
    `ORG:${personData.company}`,
    `TITLE:${personData.position}`,
    `ADR;TYPE=WORK:;;${personData.address}`,
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

const socialMedia = {
  status: true,
  socials: [
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3a",
      },
      label: "Instagram ID",
      value: "devniyaz",
      type: "instagram",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3b",
      },
      label: "Linkedin Profile",
      value: "linkedin.com/in/devniyaz",
      type: "linkedin",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Twitter",
      value: "devniyaz",
      type: "twitter",
    },
    {
      _id: {
        $oid: "643db1f57f14d8b41f43923e",
      },
      label: "Github",
      value: "github.com/devniyaz",
      type: "other",
    },
  ],
};

// Create an empty HTML string
let socialMediaHTML = "";

// Loop through each social media object in the list
for (const social of socialMedia.socials) {
  // Check if the social media value is available
  if (social.value !== "") {
    // Build the social media link HTML
    let iconClass = "";
    switch (social.type) {
      case "instagram":
        iconClass = "fa-brands fa-instagram ins";
        break;
      case "linkedin":
        iconClass = "fa-brands fa-linkedin-in";
        break;
      case "twitter":
        iconClass = "fa-brands fa-twitter";
        break;
      default:
        iconClass = "fa-solid fa-link";
    }
    socialMediaHTML += `
      <a href="https://${social.value}" class="image sm-icons">
        <i class="${iconClass}" style="color: #7c56fe;"></i>
      </a>
    `;
  }
}

// Render the social media section
const socialMediaSection = document.getElementById("social-media-section");
socialMediaSection.innerHTML = socialMedia.status
  ? `
  <div class="sm-section section">
    <h3 class="sm-head head">Social Media</h3>
    <hr />
    <div class="sm-icons">
      ${socialMediaHTML}
    </div>
  </div>
`
  : "";

// // ---

// ----
// Check if social media data is available

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
  {
    type: "Whatsapp Business",
    value: "1234672362",
  },
];

let contactVisible = true;

if (!contactVisible || contactsData.length === 0) {
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
  } else if (type === "Whatsapp Business") {
    const img = document.createElement("img");
    img.src = "wb.svg";
    img.alt = "WhatsApp Business";
    button.appendChild(img);
    button.onclick = () => window.open(`https://wa.me/${value}`);
  }
  icon.style.color = "#7c56fe";

  button.appendChild(icon);

  return button;
}

// ---

// example data, replace with your own
const linksData = [
  { name: "Link 1", url: "https://example.com/link1" },
  //   { name: "Link 2", url: "https://example.com/link2" },
  //   { name: "Link 3", url: "https://example.com/link3" },
];

let linkStatus = true;

if (!linkStatus || linksData.length == 0) {
  document.getElementsByClassName("websites-section")[0].style.display = "none";
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
  { title: "Service 1", link: "https://example.com/service1" },
  { title: "NFC", link: "https://example.com/service2" },
  { title: "Service Business", link: "https://example.com/service1" },
  { title: "NFC", link: "https://example.com/service1" },
  { title: "Service 1", link: "https://example.com/service1" },
  { title: "Service 1", link: "https://example.com/service1" },
  { title: "Service 1", link: "https://example.com/service1" },
  { title: "NFC", link: "https://example.com/service1" },
  { title: "Service Business", link: "https://example.com/service1" },
];

let serviceStatus = true;

if (!serviceStatus || services.length == 0) {
  document.getElementsByClassName("services-section")[0].style.display = "none";
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
  serviceElem.addEventListener("click", () => {
    if (service.link) {
      window.open(service.link, "_blank");
    }
  });
});

// get the video container and iframe element
const videoContainer = document.querySelector(".embedding .video");
const videoFrame = videoContainer.querySelector("iframe");

let ytStatus = true;
const ytLink = "https://www.youtube.com/watch?v=tmGDx9hVWwo";
const ytEmbed = `https://www.youtube.com/embed/${ytLink.split("v=")[1]}`;

// set the YouTube video URL
const youtubeUrl = ytStatus ? ytEmbed : "";
videoFrame.style.display = ytStatus ? "block" : "none";

// set the src attribute of the iframe element
videoFrame.setAttribute("src", youtubeUrl);

// ---------

// Define an array of products
const products = [
  {
    image: "path/to/image1.jpg",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "path/to/image2.jpg",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
];

let productVisibility = true;

if (!productVisibility || products.length == 0) {
  document.getElementsByClassName("products-section")[0].style.display = "none";
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
  cardSubtitleElem.classList.add("card-subtitle", "striked-price");
  cardSubtitleElem.textContent = product.oldPrice;
  cardContentElem.appendChild(cardSubtitleElem);

  const cardButtonElem = document.createElement("button");
  cardButtonElem.classList.add("card-button");
  cardButtonElem.textContent = product.newPrice;
  cardContentElem.appendChild(cardButtonElem);
  cardButtonElem.addEventListener("click", (e) => {
    if (product.link) {
      window.open(product.link, "_blank");
    }
  });

  productsIcons.appendChild(cardElem);
});

// Add the elements to the products section container
productsSection.appendChild(productsHead);
productsSection.appendChild(document.createElement("hr"));
productsSection.appendChild(productsIcons);

// -------
// Define the bank details data as an object

const bankDetails = {
  name: "Adolph Blaine Charles David",
  accountNumber: "88888888888888889999999",
  bankName: "Bank of America",
  branch: "New York",
  ifscCode: "123456789",
  swiftCode: "xxxxxxxxxxx",
  vatNumber: "123456789",
};

let bankVisibility = false;

console.log(document.getElementsByClassName("bank-section")[0]);
if (!bankVisibility && Object.values(bankDetails).every((val) => val === "")) {
  document.getElementsByClassName("bank-section")[0].style.display = "none";
}

// Get the bank details container element
const bankDetailsContainer = document.getElementById("bank-details");

const isStringEmpty = (str) => {
  if (str === "") return true;
  else return false;
};

const shortName = (name) => {
  let wrd = name.split(" ");
  switch (wrd.length) {
    case 1:
      return wrd[0];
    case 2:
      if (wrd[0].length > 9) {
        return `${wrd[0]} <br/> ${wrd[1]}`;
      } else return `${wrd[0]} <br/> ${wrd[1]}`;
    case 3:
      return `${wrd[0]} ${wrd[1]} <br/> ${wrd[2]}`;
    case 4:
      return `${wrd[0]} ${wrd[1]} <br/> ${wrd[2]} ${wrd[3]}`;
  }
};

// Create a function to dynamically render the bank details
function renderBankDetails() {
  // Check if all bank details are empty
  const isEmpty = Object.values(bankDetails).every((val) => val === "");
  if (isEmpty || bankVisibility) {
    // If all bank details are empty, don't render anything
    bankDetailsContainer.innerHTML = "";
    return;
  }

  // Otherwise, create the bank details HTML dynamically
  let bankDetailsHTML = "";
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Name</p><p class="dtl" style="text-align: left;">${shortName(
    bankDetails.name
  )}</p>
  </div><div class="bank-col"></div></div>`;
  bankDetailsHTML += `
  <div class="bank-row">
  <div class="bank-col">
    ${
      !isStringEmpty(bankDetails.accountNumber)
        ? `<p class="dtl-head">Account Number</p>
    <p class="dtl">${bankDetails.accountNumber}</p>`
        : ""
    }

  </div>
  <div class="bank-col">
  ${
    !isStringEmpty(bankDetails.bankName)
      ? `<p class="dtl-head">Bank Name</p>
  <p class="dtl">${bankDetails.bankName}</p>`
      : ""
  }
  </div>
</div>
                      `;
  bankDetailsHTML += `
  <div class="bank-row">
  <div class="bank-col">
  ${
    !isStringEmpty(bankDetails.branch)
      ? `<p class="dtl-head">Branch</p>
  <p class="dtl">${bankDetails.branch}</p>`
      : ""
  }
  </div>
  <div class="bank-col">
  ${
    !isStringEmpty(bankDetails.ifscCode)
      ? `<p class="dtl-head">IFSC Code</p>
  <p class="dtl">${bankDetails.ifscCode}</p>`
      : ""
  }
  </div>
</div>
  `;
  bankDetailsHTML += `
  <div class="bank-row">
  <div class="bank-col">
  ${
    !isStringEmpty(bankDetails.swiftCode)
      ? `<p class="dtl-head">Swift Code</p>
  <p class="dtl">${bankDetails.swiftCode}</p>`
      : ""
  }
  </div>
  <div class="bank-col">
  ${
    !isStringEmpty(bankDetails.vatNumber)
      ? `<p class="dtl-head">VAT Number</p>
  <p class="dtl">${bankDetails.vatNumber}</p>`
      : ""
  }
  </div>
</div>
  `;

  // Set the bank details container HTML to the dynamically generated HTML
  bankDetailsContainer.innerHTML = bankDetailsHTML;
  const bankArr = document.getElementsByClassName("bank-col");
  console.log(bankArr);
  for (let i = 0; i < bankArr.length; i++) {
    if (bankArr[i].children.length === 0) {
      bankArr[i].style.display = "none";
    }
    bankArr[i].addEventListener("click", () => {
      const colName = bankArr[i].children[0].innerHTML;
      let colValue = bankArr[i].children[1].innerHTML;
      // remove the <br> tag from the colValue
      colValue = colValue.replace("<br>", "");
      toggleModel(colName, [colValue], (copy = true));
    });
  }
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

// --------

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

let awardVisibility = true;

// main code

if (!awardVisibility || awardsData.length === 0) {
  let e = document.getElementsByClassName("awards_section");
  document.getElementsByClassName("awards_section")[0].style.display = "none";
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

// --------

// define an array of services
const certif = [
  {
    title: "Service 1",
    awardName: "Award 1",
    awardAuthority: "Authority 1",
  },
];

let certifVisibility = true;

// main code

if (!certifVisibility || certif.length === 0) {
  const certifSection = document.getElementById("certif-section");
  if (certifSection) {
    certifSection.style.display = "none";
  }
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
});

// --------
const formEmail = "";
const formSubmit = document.querySelector("form");
formSubmit.setAttribute("action", `mailto:${formEmail}`);
