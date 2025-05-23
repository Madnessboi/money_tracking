const BODY_FIXED_CLASSNAME = "body_fixed";

const bodyNode = document.querySelector("body");
const popupNode = document.querySelector(".js-popup-limit");
const btnOpenNode = document.querySelector(".js-limit-btn");
const popupContentNode = document.querySelector(".js-popup__limit-content");
const btnCloseNode = document.querySelector(".js-popup__close-btn");
const limitCurrentNode = document.querySelector(".js-limit");
const limitNewNode = document.querySelector(".js-popup__limit-input");

btnOpenNode.addEventListener("click", togglePopup);
btnCloseNode.addEventListener("click", togglePopup);

popupNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    togglePopup();
  }
});

function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}
