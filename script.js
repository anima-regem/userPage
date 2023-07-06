const altBtn = document.getElementById("btn_hi");
altBtn.style.display = "none";

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
  websites: ["https://example.com", "https://example2.com"],
  phone: "1234567890",
};

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
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Facebook",
      value: "devniyaz",
      type: "facebook",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Dribbble",
      value: "devniyaz",
      type: "dribbble",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Spotify",
      value: "devniyaz",
      type: "spotify",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Behance",
      value: "devniyaz",
      type: "behance",
    },
    {
      _id: {
        $oid: "643d798412ca41ecc1784a3c",
      },
      label: "Medium",
      value: "devniyaz",
      type: "medium",
    },
  ],
};

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
      "https://goo.gl/maps/BgeeqMgRWPd9edSP7",
    ],
  },
  {
    type: "Whatsapp",
    value: "918129937097",
  },
  {
    type: "Whatsapp Business",
    value: "918129937097",
  },
];

personData.websites = [`${window.location.href}`, ...personData.websites];

const createVcard = () => {
  const websites = personData.websites; // Assuming websites is an array of website URLs

  const nameParts = personData.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;`,
    `FN:${personData.name}`,
    `EMAIL;TYPE=WORK:${personData.email}`,
    `ORG:${personData.company}`,
    `TITLE:${personData.position}`,
    `ADR;TYPE=WORK:;;${personData.address}`,
    `TEL;TYPE=CELL:${personData.phone}`,
    ...websites.map((website) => `URL:${website}`),
    ...socialMedia.socials.map(
      (social) => `X-SOCIALPROFILE;TYPE=${social.type}:${social.value}`
    ),
    ...contactsData
      .filter((contact) =>
        ["Whatsapp", "Whatsapp Business"].includes(contact.type)
      )
      .map((contact) => `X-SOCIALPROFILE;TYPE=Whatsapp:${contact.value}`),
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `${personData.name}.vcf`;
  downloadLink.click();

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
      case "facebook":
        iconClass = "fa-brands fa-facebook";
        break;
      // case "dribbble":
      //   iconClass = "fa-brands fa-dribbble";
      //   break;
      // case "spotify":
      //   iconClass = "fa-brands fa-spotify";
      //   break;
      // case "medium":
      //   iconClass = "fa-brands fa-medium-m";
      //   break;
      // case "behance":
      //   iconClass = "fa-brands fa-behance";
      //   break;
      default:
        iconClass = "fa-solid fa-link";
    }
    socialMediaHTML += `
      <a href="https://${social.value}" class="image sm-icons">
        <i class="${iconClass}"></i>
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
    personData.websites = [`${value[2]}`, ...personData.websites];
    icon.classList.add("fa-solid", "fa-location-dot");
    button.onclick = () => window.open(`${value[2]}`);
  } else if (type === "Whatsapp") {
    icon.classList.add("fa-brands", "fa-whatsapp");
    button.onclick = () => window.open(`https://wa.me/${value}`);
  } else if (type === "Whatsapp Business") {
    const img = `<svg width="25" height="25" viewBox="0 0 25 25" fill="var(--btnTxt)" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0564 3.69444C18.7945 1.43052 15.7866 0.183221 12.5814 0.181885C5.97766 0.181885 0.603173 5.55436 0.6005 12.1582C0.597893 14.2599 1.1495 16.325 2.19968 18.1455L0.5 24.3519L6.85128 22.6864C8.60802 23.6429 10.5764 24.144 12.5766 24.1442H12.5815C19.1845 24.1442 24.5596 18.7711 24.5623 12.1673C24.5635 8.96709 23.3185 5.95783 21.0564 3.69431V3.69444ZM12.5815 22.1219H12.5774C10.7941 22.1222 9.04354 21.6429 7.50908 20.7343L7.14543 20.5186L3.37668 21.5075L4.38262 17.8341L4.1462 17.4568C3.14843 15.8701 2.62022 14.0333 2.62266 12.1589C2.62534 6.67029 7.09251 2.20498 12.5854 2.20498C15.2449 2.20605 17.7454 3.24286 19.6255 5.12456C21.5056 7.00627 22.5404 9.50728 22.5389 12.1676C22.5368 17.6567 18.0697 22.1226 12.5811 22.1226L12.5815 22.1219Z" fill="var(--btnTxt)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56446 17.9598C8.64878 18.0106 8.82199 18.0106 9.21931 18.0102C10.9052 18.0087 12.3614 18.0036 13.3973 18.0036C18.2313 18.0036 18.1042 12.9146 15.844 12.2797C16.1751 11.6932 17.6834 10.5915 16.7505 8.3142C15.8284 6.06243 11.8612 6.57349 9.14808 6.57482C8.14415 6.57482 8.29436 7.31668 8.29944 8.47003C8.30773 10.2968 8.30091 15.2414 8.29944 17.3788C8.29944 17.8121 8.43028 17.8787 8.56446 17.9598ZM10.6561 16.0948C11.1125 16.0948 12.1891 16.0948 13.1121 16.0933C14.1572 16.0917 15.0877 15.6029 15.0645 14.5624C15.0475 13.5824 14.3955 13.2608 13.4904 13.1709C12.6284 13.1792 11.6425 13.1792 10.6561 13.1792V16.0948ZM10.6561 11.2109C12.4743 11.1859 13.1758 11.2842 14.1685 11.0356C14.8501 10.648 15.1487 9.21242 14.1724 8.72462C13.4942 8.38583 11.4901 8.5017 10.6561 8.53645V11.2109Z" fill="var(--btnTxt)"/>
    </svg>
    `;
    const imgWrapper = document.createElement("div");
    imgWrapper.innerHTML = img;
    button.appendChild(imgWrapper.firstChild);

    button.onclick = () => window.open(`https://wa.me/${value}`);

    altBtn.onclick = () => window.open(`https://wa.me/${value}?text=Hello`);
    altBtn.style.display = "block";
  }

  button.appendChild(icon);

  return button;
}
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
      
      <svg class='arrow' width="14" height="14" viewBox="0 0 14 14" fill="var(--btnTxt)" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.10691 13.2783L0.758644 11.93L10.0039 2.68471H1.72169V0.758606H13.2783V12.3152H11.3522V4.03298L2.10691 13.2783Z" fill="var(--btnTxt)"/>
      </svg>
      
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
  {
    image: "images/image.png",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: "Smart Business Card Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: "Smart Business ",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: "Smart  Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: " Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
  {
    image: "images/image.png",
    title: "Smart ",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
    desc: "Lorem Ipsum",
  },
];

let serviceVisibility = true;

if (!serviceVisibility || services.length == 0) {
  document.getElementsByClassName("products-section")[0].style.display = "none";
}

// Get the products section container
const servicesSection = document.getElementById("services-section");

// Create the products heading element
const servicesHead = document.createElement("h3");
servicesHead.classList.add("products-head", "head");
servicesHead.textContent = "Services";

// Create the products icons container element
const servicesIcons = document.createElement("div");
servicesIcons.classList.add("products-icons");

// Loop through the products array and dynamically create the card elements
services.forEach((service) => {
  const cardElem = document.createElement("div");
  cardElem.classList.add("card");

  const cardImageElem = document.createElement("div");
  cardImageElem.classList.add("card-image");
  cardImageElem.style.backgroundImage = `url(${service.image})`;
  cardElem.appendChild(cardImageElem);

  const cardContentElem = document.createElement("div");
  cardContentElem.classList.add("card-content");
  cardElem.appendChild(cardContentElem);

  const cardTitleElem = document.createElement("h1");
  cardTitleElem.classList.add("card-title");
  cardTitleElem.textContent = service.title;
  cardContentElem.appendChild(cardTitleElem);

  const cardButtonElem = document.createElement("button");
  cardButtonElem.classList.add("card-button");
  cardButtonElem.textContent = "View More";
  cardContentElem.appendChild(cardButtonElem);
  cardButtonElem.addEventListener("click", (e) => {
    openPopup(service.image, service.title, service.desc, service.link);
  });

  servicesIcons.appendChild(cardElem);
});

// Add the elements to the products section container
servicesSection.appendChild(servicesHead);
servicesSection.appendChild(document.createElement("hr"));
servicesSection.appendChild(servicesIcons);

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
    image: "images/image.png",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: "Smart Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: "Smart Business Card Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: "Smart Business ",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: "Smart  Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: " Business Card",
    oldPrice: "INR 2000",
    newPrice: "Frame 101",
    link: "https://google.com",
  },
  {
    image: "images/image.png",
    title: "Smart ",
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

  const cardButtonElem = document.createElement("button");
  cardButtonElem.classList.add("card-button");
  cardButtonElem.textContent = "View More";
  cardContentElem.appendChild(cardButtonElem);
  cardButtonElem.addEventListener("click", (e) => {
    openPopup();
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
  name: "Adolph Blaine Charles David Diengo Andreas",
  accountNumber: "88888888888888888888",
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
  bankDetailsHTML += `<div class="bank-row"><div class="bank-col"><p class="dtl-head">Name</p><p class="dtl bank-name" style="text-align: left;">${bankDetails.name}</p>
  </div></div>`;
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
    name: "Best IT Consultant - 2023",
    authority: "Authority 1msdafsadfjkasdfk asdfhakjsdf asdhf",
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

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function handleScroll() {
  var scrollButton = document.getElementById("scrollButton");
  var footer = document.getElementById("footer");
  var footerOffset = footer.offsetTop;
  var scrollButtonPosition = window.pageYOffset + window.innerHeight;

  if (scrollButtonPosition > footerOffset) {
    scrollButton.style.bottom = scrollButtonPosition - footerOffset + 16 + "px";
  } else {
    scrollButton.style.bottom = "16px";
  }

  if (window.pageYOffset > 200) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

// Attach the scroll event listener to the window
window.addEventListener("scroll", handleScroll);

// Products Popup

function openPopup(image, title, description, link) {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.classList.add("show");

  // Set the content of the popup dynamically
  var popupImage = document.getElementById("popupImage");
  popupImage.src = image;

  var popupTitle = document.getElementById("popupTitle");
  popupTitle.innerHTML = title;

  var popupDescription = document.getElementById("popupDescription");
  popupDescription.innerHTML = description;

  var popupButton = document.getElementById("popupButton");
  popupButton.onclick = function () {
    window.location.href = link; // Replace with your store URL
  };
}

function closePopup() {
  var popup = document.getElementById("popup__container");
  popup.style.display = "none";
  popup.classList.remove("show");
}
