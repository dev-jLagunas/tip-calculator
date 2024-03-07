//*****Import Styles*****
import "./style.scss";

//****** DOM Elements *****
const billInput = document.querySelector(".bill-input");
const tipBtns = document.querySelectorAll(".tip-button");
const customInput = document.querySelector(".custom-tip-input");
const errorMsg = document.querySelector(".error-message");
const peopleNumInput = document.querySelector(".people-input");
const tipDisplay = document.querySelector(".total-tip");
const totalDisplay = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset-btn");

//****** Variables *****
let billAmount = 0;
let tipPercentage = 0;
let numOfPeople = 0;

//****** Event Listeners *****
// collect all inputs to trigger calculation

billInput.addEventListener("input", (e) => {
  billAmount = parseFloat(e.target.value);
  calculateTotals();
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");
    tipPercentage = parseFloat(e.target.dataset.tip) / 100;
    calculateTotals();
  });
});

customInput.addEventListener("input", (e) => {
  tipPercentage = parseFloat(e.target.value) / 100;
  calculateTotals();
});

peopleNumInput.addEventListener("input", (e) => {
  numOfPeople = parseFloat(e.target.value);
  if (numOfPeople <= 0) {
    errorMsg.style.display = "block";
    peopleNumInput.classList.add("error");
  } else {
    errorMsg.style.display = "none";
    peopleNumInput.classList.remove("error");
  }
  calculateTotals();
});

resetBtn.addEventListener("click", resetCalculator);

//****** Functions *****
function calculateTotals() {
  if (billAmount && tipPercentage && numOfPeople) {
    const totalTip = billAmount * tipPercentage;
    const tipPerPerson = totalTip / numOfPeople;
    const totalPerPerson = billAmount / numOfPeople + tipPerPerson;

    //Update UI Displays
    tipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  }
}

function resetCalculator() {
  billAmount = 0;
  tipPercentage = 0;
  numOfPeople = 0;

  tipBtns.forEach((btn) => btn.classList.remove("active"));
  billInput.value = "";
  customInput.value = "";
  peopleNumInput.value = "";
  peopleNumInput.classList.remove("error");
  tipDisplay.textContent = "$00:00";
  totalDisplay.textContent = "$00:00";
  errorMsg.style.display = "none";
}
