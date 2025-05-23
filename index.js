const STATUS_OK = "расходы в норме";
const STATUS_OUT_OF_LIMIT = "лимит превышен!";
const CURRENCY = "руб";

const LIMIT_DEFAULT = 10000;

const POPUP_OPENED_CLASSNAME = "popup_open";
const BODY_FIXED_CLASSNAME = "body_fixed";

const DROPDOWN_HIDDEN = "hidden";

const bodyNode = document.querySelector("body");
const popupNode = document.querySelector(".js-popup-limit");
const btnOpenNode = document.querySelector(".js-limit-btn");
const popupContentNode = document.querySelector(".js-popup__limit-content");
const btnCloseNode = document.querySelector(".js-popup__close-btn");

const inputNode = document.querySelector(".js-expense-input");
const addBtnNode = document.querySelector(".js-add-btn");
const historyNode = document.querySelector(".js-history");
const cleanBtnNode = document.querySelector(".js-clean-btn");
const sumNode = document.querySelector(".js-sum");
const limitChange = document.querySelector(".js-popup__limit-input");
const saveLimitBtn = document.querySelector(".js-popup__save-btn");
const statusNode = document.querySelector(".js-status");
const categorySelectNode = document.querySelector(".js-dropdown");

const limitNode = document.getElementById("limitValue");
const limit = parseInt(limitNode.innerText);

let expenses = [];

init(expenses);

btnOpenNode.addEventListener("click", togglePopup);
btnCloseNode.addEventListener("click", togglePopup);
saveLimitBtn.addEventListener("click", changeLimitHandler);
addBtnNode.addEventListener("click", addBtnHandler);
cleanBtnNode.addEventListener("click", clearBtnHandler);

function getTotal() {
  let sum = 0;
  expenses.forEach(function (expense) {
    sum += expense.amount;
  });

  return sum;
}

function renderStatus() {
  debugger;
  const total = getTotal();
  sumNode.innerText = total;

  if (total <= limit) {
    statusNode.innerText = STATUS_OK;
    statusNode.classList.add("status_green");
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб.)`;
    statusNode.classList.add("status_red");
  }
}

function addBtnHandler() {
  const currentAmount = getExpenseFromUser();

  if (!currentAmount) {
    return;
  }

  const currentCategory = getSelectedCategory();

  if (currentCategory === "Категория") {
    return;
  }

  const newExpense = { amount: currentAmount, category: currentCategory };
  console.log(newExpense);

  expenses.push(newExpense);

  render(expenses);

  clearInput();
}

function clearBtnHandler() {
  expenses.length = 0;
  render(expenses);

  statusNode.classList.remove("status_yellow", "status_orange", "status_red");
  statusNode.innerText = STATUS_OK;
}

popupNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    togglePopup();
  }
});

function init(expenses) {
  statusNode.innerText = STATUS_OK;
  sumNode.innerText = getTotal(expenses);
}

function getExpenseFromUser() {
  return parseInt(inputNode.value);
}

function clearInput() {
  inputNode.value = "";
}

function render() {
  renderHistory(expenses);
  renderStatus();
}

function getSelectedCategory() {
  return categorySelectNode.value;
}

function renderHistory(expenses) {
  historyNode.innerHTML = "";

  expenses.forEach(function (expense) {
    const historyItem = document.createElement("li");
    historyItem.className = "rub";
    historyItem.innerText = `${expense.amount} руб. - ${expense.category}`;
    historyNode.appendChild(historyItem);
  });
}

function changeLimitHandler() {
  const newLimit = limitChange.value;

  const newLimitValue = parseInt(newLimit);

  if (!newLimitValue) {
    return;
  }

  limitNode.innerText = newLimitValue;
  limit = newLimitValue;

  togglePopup();
}

function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}
