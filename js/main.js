var addButton = document.querySelector(".add");
var closeBtn = document.querySelector(".btn-close");
var cancelBtn = document.querySelector(".cancel-btn");
var modalEl = document.querySelector("#addContactModal");
var modal = new bootstrap.Modal(modalEl);
var totalContactSpan = document.querySelector(".totalContactSpan");
var totalContact = document.querySelector(".totalContact");
var favCount = document.querySelector(".favCount");
var emergCount = document.querySelector(".emergCount");
var fullName = document.querySelector("#fullName");
var contactpreview = document.querySelector(".contact-photo-preview");
var photoInput = document.querySelector("#photoInput");
var avatarPath = document.querySelector("#avatarPath");
var phoneNumber = document.querySelector("#phoneNumber");
var emailAddress = document.querySelector("#emailAddress");
var address = document.querySelector("#address");
var group = document.querySelector("#group");
var notes = document.querySelector("#notes");
var isFavorite = document.querySelector("#isFavorite");
var isEmergency = document.querySelector("#isEmergency");
var saveContactBtn = document.querySelector("#saveContactBtn");
var updateContactBtn = document.querySelector("#updateContactBtn");
var searchInput = document.querySelector(".searchInput");
var allContact = [];

if (localStorage.getItem("all") !== null) {
  allContact = JSON.parse(localStorage.getItem("all"));
  displayContact();
}

closeBtn.addEventListener("click", function () {
  clearForm();
});
cancelBtn.addEventListener("click", function () {
  clearForm();
});

addButton.addEventListener("click", function () {
  mainIndex = null;
  clearForm();
});

function validName() {
  var nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,}){0,4}$/;
  var phoneRegex = /^(010|011|012|015)\d{8}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var okName = nameRegex.test(fullName.value.trim());
  var okPhone = phoneRegex.test(phoneNumber.value.trim());
  var emailVal = emailAddress.value.trim();
  var okEmail = emailVal === "" ? true : emailRegex.test(emailVal);
  document
    .querySelectorAll(".form-group .alert")[0]
    .classList.toggle("d-none", okName);

  document
    .querySelectorAll(".form-group .alert")[1]
    .classList.toggle("d-none", okPhone);

  document
    .querySelectorAll(".form-group .alert")[2]
    .classList.toggle("d-none", okEmail);

  return okName && okPhone && okEmail;
}

function addContact() {
  if (validName() == true) {
    saveContactBtn.classList.add("d-flex");
    updateContactBtn.classList.add("d-none");
    var contact = {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      emailAddress: emailAddress.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      isFavorite: isFavorite.checked,
      isEmergency: isEmergency.checked,
      image: avatarPath.value,
    };
    allContact.push(contact);
    Swal.fire({
      title: "Add",
      text: "Contact has added successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    console.log(allContact);
    localStorage.setItem("all", JSON.stringify(allContact));
    displayContact();
    clearForm();
    modal.hide();
  }
}

function displayContact() {
  var cartoona = "";
  if (allContact.length <= 0) {
    cartoona = `
      <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
    `;
  } else {
    for (var i = 0; i < allContact.length; i++) {
      var colors = getGroupColor(allContact[i].group);
      cartoona += `
              
                    <div class="col-12 col-sm-6 position-relative">
                      <div class="card rounded-3">
                        <div class="d-flex p-3">
                          <div class="position-relative">
                            <div class="name-info p-2 rounded-3">
                              ${
                                allContact[i].image
                                  ? `<img src="${allContact[i].image}" alt="${allContact[i].fullName}" class= "rounded-3 w-100 h-100"/>`
                                  : `<span class="text-white fw-bold">
                                      ${(allContact[i].fullName || "NA")
                                        .trim()
                                        .split(" ")[0][0]
                                        .toUpperCase()}
                                      ${(allContact[i].fullName || "NA")
                                        .trim()
                                        .split(" ")
                                        .slice(-1)[0][0]
                                        .toUpperCase()}
                                    </span>`
                              }
                            </div>
                            ${
                              allContact[i].isFavorite
                                ? `
                            <div class="top position-absolute rounded-5">
                              <i class="fa-solid fa-star text-white"></i>
                            </div>`
                                : ""
                            }

                          ${
                            allContact[i].isEmergency
                              ? `
                            <div class="bottom position-absolute">
                              <i class="fa-solid fa-heart-pulse text-white"></i>
                            </div>`
                              : ""
                          }
                          </div>
                          <div class="ps-3">
                            <p class="name mb-1 ps-2 fw-bold text-black">
                              ${allContact[i].fullName}
                            </p>
                            <div class="d-flex">
                              <div
                                class="phone-icon align-self-start rounded-3"
                              >
                                <i class="fa-solid fa-phone"></i>
                              </div>
                              <p class="phone align-self-center ps-2">
                                ${allContact[i].phoneNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                        ${
                          allContact[i].emailAddress
                            ? `
                          <div class="d-flex align-items-start ps-3 pe-3">
                          <div class="message-icon rounded-2">
                            <i class="fa-solid fa-envelope"></i>
                          </div>
                          <div class="ps-2">
                            <p>${allContact[i].emailAddress}</p>
                          </div>
                        </div>
                          `
                            : ""
                        }
                        
                        ${
                          allContact[i].address
                            ? `
                          <div class="d-flex align-items-start ps-3 pe-3">
                          <div class="address-icon rounded-2">
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <div class="ps-2">
                            <p>${allContact[i].address}</p>
                          </div>
                        </div>
                          `
                            : ""
                        }

                        ${
                          allContact[i].group
                            ? `
                                        <span class="contact-tag d-inline-flex align-items-center" 
                                        style="background-color: ${colors.bg}; color: ${colors.text}; 
                                        border-color: ${colors.border};">${allContact[i].group}
                                        </span>
                                        
                                        `
                            : ""
                        }
                        <div
                          class="icon-all p-3 d-flex justify-content-between"
                        >
                          <div>
                            <a
                              href="tel:${allContact[i].phoneNumber}"
                              class="tel-icon p-2 rounded-3 me-2"
                            >
                              <i class="fa-solid fa-phone"></i>
                            </a>
                            <a
                              href="mailto:${allContact[i].emailAddress}"
                              class="mess-icon p-2 rounded-3 me-2"
                            >
                              <i class="fa-solid fa-envelope"></i>
                            </a>
                          </div>
                          

                          <div class="d-flex align-items-start">
                            <div class="star-icon rounded-3 me-2 ${
                              allContact[i].isFavorite ? "active" : ""
                            }" onclick="toggleFav(${i})">
                            <i class="${
                              allContact[i].isFavorite
                                ? "fa-solid"
                                : "fa-regular"
                            } fa-star"></i>
                          </div>

                          <div class="heart-icon rounded-3 me-2 ${
                            allContact[i].isEmergency ? "active" : ""
                          }" onclick="toggleEmerg(${i})">
                            <i class="${
                              allContact[i].isEmergency
                                ? "fa-solid fa-heart-pulse"
                                : "fa-regular fa-heart"
                            }"></i>
                          </div>
                            <div class="edit-icon rounded-3 me-2">
                              <i onclick="preUpdateContact(${i})" class="fa-solid fa-pen"></i>
                            </div>
                            <div class="delete-icon rounded-3 me-2">
                              <i onclick="deleteContact(${i})" class="fa-solid fa-trash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                  
    `;
    }
  }
  document.querySelector(".card-inner").innerHTML = cartoona;
  totalContactCount();
  renderFavEmerg();
}
function clearForm() {
  fullName.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  group.value = "";
  notes.value = "";
  isFavorite.checked = false;
  isEmergency.checked = false;
  avatarPath.value = "";
  contactpreview.innerHTML = `
  <i class="fa-solid fa-user"></i>
  `;
}

function deleteContact(i) {
  Swal.fire({
    title: "Delete Contact",
    text: `Are you sure you want to delete ${allContact[i].fullName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allContact.splice(i, 1);
      localStorage.setItem("all", JSON.stringify(allContact));
      displayContact();
      Swal.fire({
        title: "Deleted!",
        text: "contact  has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
}
var mainIndex = null;
function preUpdateContact(index) {
  modal.show();
  fullName.value = allContact[index].fullName;
  phoneNumber.value = allContact[index].phoneNumber;
  emailAddress.value = allContact[index].emailAddress;
  address.value = allContact[index].address;
  group.value = allContact[index].group;
  notes.value = allContact[index].notes;
  isFavorite.checked = allContact[index].isFavorite;
  isEmergency.checked = allContact[index].isEmergency;
  avatarPath.value = allContact[index].image;
  mainIndex = index;
}
function updateContact() {
  if (validName() == true) {
    var contact = {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      emailAddress: emailAddress.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      isFavorite: isFavorite.checked,
      isEmergency: isEmergency.checked,
      image: avatarPath.value,
    };
    allContact.splice(mainIndex, 1, contact);
    Swal.fire({
      title: "Updated",
      text: "Contact has been updated successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    displayContact();
    clearForm();
    localStorage.setItem("all", JSON.stringify(allContact));
    mainIndex = null;
    modal.hide();
  }
}
saveContactBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (mainIndex === null) {
    addContact();
  } else {
    updateContact();
  }
});

function searchName(term) {
  term = (term || "").trim().toLowerCase();

  if (term === "") {
    displayContact();
    return;
  }

  var cartoona = "";
  for (var i = 0; i < allContact.length; i++) {
    var name = (allContact[i].fullName || "").toLowerCase();
    var phone = (allContact[i].phoneNumber || "").toLowerCase();
    var mail = (allContact[i].emailAddress || "").toLowerCase();

    if (name.includes(term) || phone.includes(term) || mail.includes(term)) {
      var colors = allContact[i].group
        ? getGroupColor(allContact[i].group)
        : { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" };

      cartoona += `
              
                    <div class="col-12 col-sm-6 position-relative">
          <div class="card rounded-3">
            <div class="d-flex p-3">
              <div class="position-relative">
                <div class="name-info p-2 rounded-3">
                  <i class="fa-solid fa-navicon text-white"></i>
                </div>

                <div class="top position-absolute rounded-5">
                  <i class="fa-solid fa-star text-white"></i>
                </div>

                <div class="bottom position-absolute">
                  <i class="fa-solid fa-heart-pulse text-white"></i>
                </div>
              </div>

              <div class="ps-3">
                <p class="name mb-1 ps-2 fw-bold text-black">
                  ${allContact[i].fullName}
                </p>
                <div class="d-flex">
                  <div class="phone-icon align-self-start rounded-3">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <p class="phone align-self-center ps-2">
                    ${allContact[i].phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            ${
              allContact[i].emailAddress
                ? `
              <div class="d-flex align-items-start ps-3 pe-3">
                <div class="message-icon rounded-2">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="ps-2">
                  <p>${allContact[i].emailAddress}</p>
                </div>
              </div>`
                : ""
            }

            ${
              allContact[i].address
                ? `
              <div class="d-flex align-items-start ps-3 pe-3">
                <div class="address-icon rounded-2">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="ps-2">
                  <p>${allContact[i].address}</p>
                </div>
              </div>`
                : ""
            }

            ${
              allContact[i].group
                ? `
              <span class="contact-tag d-inline-flex align-items-center"
                style="background-color:${colors.bg}; color:${colors.text}; border-color:${colors.border};">
                ${allContact[i].group}
              </span>`
                : ""
            }

            <div class="icon-all p-3 d-flex justify-content-between">
              <div>
                <a href="tel:${
                  allContact[i].phoneNumber
                }" class="tel-icon p-2 rounded-3 me-2">
                  <i class="fa-solid fa-phone"></i>
                </a>
                <a href="mailto:${
                  allContact[i].emailAddress
                }" class="mess-icon p-2 rounded-3 me-2">
                  <i class="fa-solid fa-envelope"></i>
                </a>
              </div>

              <div class="d-flex align-items-start">
                <div class="star-icon rounded-3 me-2"><i class="fa-regular fa-star"></i></div>
                <div class="heart-icon rounded-3 me-2"><i class="fa-regular fa-heart"></i></div>

                <div class="edit-icon rounded-3 me-2">
                  <i onclick="preUpdateContact(${i})" class="fa-solid fa-pen"></i>
                </div>
                <div class="delete-icon rounded-3 me-2">
                  <i onclick="deleteContact(${i})" class="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  document.querySelector(".card-inner").innerHTML = cartoona;
}

function getGroupColor(group) {
  var colors = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };

  return colors[group];
}

function totalContactCount() {
  totalContact.innerHTML = allContact.length;
  totalContactSpan.innerHTML = allContact.length;
}
photoInput.addEventListener("change", function () {
  var file = photoInput.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (e) {
    avatarPath.value = e.target.result;
    contactpreview.innerHTML = `<img src="${avatarPath.value}" alt="contact photo" class="rounded-circle h-100 w-100" />`;
  };
  reader.readAsDataURL(file);
});

function getInitials(name) {
  name = (name || "").trim();
  if (!name) return "NA";

  var parts = name.split(" ").filter(Boolean);

  var a = (parts[0] || "N")[0];
  var last = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  var b = (last || "A")[0];

  return (a + b).toUpperCase();
}

function toggleFav(i) {
  allContact[i].isFavorite = !allContact[i].isFavorite;
  localStorage.setItem("all", JSON.stringify(allContact));
  displayContact();
}

function toggleEmerg(i) {
  allContact[i].isEmergency = !allContact[i].isEmergency;
  localStorage.setItem("all", JSON.stringify(allContact));
  displayContact();
}

function renderFavEmerg() {
  var favBox = document.querySelector(".favorites-card:not(.emerg) .fav-list");
  var emBox = document.querySelector(".favorites-card.emerg .fav-list");

  var favHTML = "";
  var emHTML = "";
  var favNum = 0;
  var emNum = 0;

  for (var i = allContact.length - 1; i >= 0; i--) {
    var c = allContact[i];
    var initials = getInitials(c.fullName);

    if (c.isFavorite) {
      favNum++;
      favHTML += `
        <div class="fav-item d-flex align-items-center p-2">
          <div class="name-info fav-avatar">
            <span class="text-white fw-bold">${initials}</span>
          </div>

          <div class="fav-text ms-2">
            <p class="fav-name mb-0">${c.fullName}</p>
            <p class="fav-number mb-0">${c.phoneNumber}</p>
          </div>

          <a href="tel:${c.phoneNumber}" class="fav-call ms-2">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>`;
    }

    if (c.isEmergency) {
      emNum++;
      emHTML += `
        <div class="fav-item d-flex align-items-center p-2">
          <div class="name-info fav-avatar">
            <span class="text-white fw-bold">${initials}</span>
          </div>

          <div class="fav-text ms-2">
            <p class="fav-name mb-0">${c.fullName}</p>
            <p class="fav-number mb-0">${c.phoneNumber}</p>
          </div>

          <a href="tel:${c.phoneNumber}" class="fav-call ms-2">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>`;
    }
  }

  favCount.innerHTML = favNum;
  emergCount.innerHTML = emNum;

  if (favBox)
    favBox.innerHTML =
      favHTML || `<p class="text-muted small px-2 mb-0">No favorites</p>`;
  if (emBox)
    emBox.innerHTML =
      emHTML || `<p class="text-muted small px-2 mb-0">No emergency</p>`;

  var favInner = favCount.closest(".inner");
  var emInner = emergCount.closest(".inner");

  if (favInner) favInner.classList.toggle("has-fav", favNum > 0);
  if (emInner) emInner.classList.toggle("has-emerg", emNum > 0);
}

var nav = document.querySelector("nav.navbar");

function handleNavBlur() {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", handleNavBlur);
handleNavBlur();
