const CLASS_EL = {
  navigationItem: "navigation__item",
  filterButton: "filter__button",
  portfolioPicture: "portfolio__picture"
};

const defaultPictures = [...document.querySelectorAll(".portfolio__picture")];

function addEventListenerElement(className) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach(element => {
    element.addEventListener("click", e => {
      const activEl = document.querySelector(`.${className}_active`);
      if (activEl) activEl.classList.remove(`${className}_active`);
      element.classList.add(`${className}_active`);
      if (element === activEl && className === "portfolio__picture")
        activEl.classList.remove(`${className}_active`);

      switch (className) {
        case "navigation__item":
          e.preventDefault();
          const blockID = element.firstChild.getAttribute("href").substr(1);
          document.getElementById(blockID).scrollIntoView({
            block: "center",
            behavior: "smooth"
          });
          break;

        case "filter__button":
          const sortPictures = [...defaultPictures].sort(() => Math.random() - 0.5);
          document.querySelectorAll('.portfolio__picture').forEach(picture => picture.remove());
          document.querySelector('.portfolio__gallery').prepend(...sortPictures);
          document.querySelectorAll('.portfolio__picture').forEach(picture => {
            picture.dataset.typePicture !== element.dataset.typeFilter &&
            element.dataset.typeFilter !== "all"
              ? (picture.style.display = "none")
              : (picture.style.display = "");
          });
          /*let pictures = [...defaultPictures];
          pictures.forEach(picture => {
            picture.dataset.typePicture !== element.dataset.typeFilter &&
            element.dataset.typeFilter !== "all"
              ? (picture.style.display = "none")
              : (picture.style.display = "");
          });
          pictures.forEach(picture => picture.remove());
          const sortPictures = [...pictures].sort(() => Math.random() - 0.5);
          document.querySelector('.portfolio__gallery').prepend(...sortPictures);
          console.log([...sortPictures])
          console.log([...pictures]);
          break;*/
      }
    });
  });
}
addEventListenerElement(CLASS_EL.navigationItem);
addEventListenerElement(CLASS_EL.filterButton);
addEventListenerElement(CLASS_EL.portfolioPicture);

function activNavigationItem() {}

(function activePhone() {
  const elements = document.querySelectorAll(".phone__item.layer");
  elements.forEach(element => {
    element.addEventListener("click", e => {
      e.preventDefault();
      element.classList.toggle("layer_off");
    });
  });
})();

(function sendInfo() {
  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const submitButton = document.querySelector(".button-submit");
  const modalButton = document.querySelector(".modal-button");
  submitButton.addEventListener("click", e => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    if (email.checkValidity() && name.checkValidity()) {
      const subjectValue = document.querySelector("#subject").value.trim();
      const describeValue = document.querySelector("#describe").value.trim();
      modal.children.item(1).innerHTML = subjectValue
        ? `<b>Тема:</b> ${subjectValue}`
        : "Без темы";
      modal.children.item(2).innerHTML = describeValue
        ? `<b>Описание:</b> ${describeValue}`
        : "Без описания";
      modalOverlay.classList.toggle("close");
      modal.classList.toggle("close");
      e.preventDefault();
    }
  });
  modalButton.addEventListener("click", () => {
    modalOverlay.classList.toggle("close");
    modal.classList.toggle("close");
  });
})();
