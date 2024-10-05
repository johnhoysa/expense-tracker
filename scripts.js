// et prefix short for expense tracker
// create variables
// get inputs to collect user information
const etType = document.getElementById("etType");
const etDesc = document.getElementById("etDesc");
const etAmount = document.getElementById("etAmount");
const etAdd = document.getElementById("etAdd");
//
const etExpense = document.querySelector("#etExpense section");
const etIncome = document.querySelector("#etIncome section");
const expenseTotal = document.getElementById("expenseTotal");
const incomeTotal = document.getElementById("incomeTotal");
const balanceTotal = document.getElementById("balanceTotal");
//
const balanceUi = document.getElementById("balance");
const resultUi = document.querySelector(".results");
const expenseUi = document.getElementById("etExpense");
const incomeUi = document.getElementById("etIncome");

// Items to help with calculations
let totalExpense = 0;
let totalIncome = 0;
let totalBalance = 0;

// ensure element is not null
if (etAdd) {
  // when user clicks Add run theses function
  etAdd.addEventListener("click", () => {
    addItem();
    displayUi();
    resetForm();
    updateTotals();
  });
}

// Get values from inputs
function addItem() {
  // Ensure elements are not null
  if (!etType || !etDesc || !etAmount) return;

  // get values
  const type = etType.value;
  const desc = etDesc.value;
  const amount = etAmount.value;

  // get date from other function
  const formattedDate = getFormattedDate();

  // create content to display
  const currentEt = `
    <ul class="result-content">
        <li class="desc">${desc}</li>
        <li class="amount">${amount}</li>
        <li class="date">${formattedDate}</li>
        <li><button class="etDelete" type="submit">Delete</button></li>
    </ul>
    `;

  // Tell content where to go
  if (type === "expense") {
    etExpense.innerHTML += currentEt;
    expenseUi.classList.add("display-block");
  } else {
    etIncome.innerHTML += currentEt;
    incomeUi.classList.add("display-block");
  }
  deleteItem();
}

// If user clicks delete do the following
function deleteItem() {
  const elements = document.querySelectorAll(".etDelete");
  elements.forEach((element) => {
    element.addEventListener("click", function () {
      // delete the element
      const li = this.parentElement;
      const ul = li.parentElement;
      ul.remove();
      // get new totals
      updateTotals();
    });
  });
}

// After clicking add result field values
function resetForm() {
  if (!etType || !etDesc || !etAmount) return;
  etType.value = "expense";
  etDesc.value = "";
  etAmount.value = "";
}

function displayUi() {
  if (!balanceUi || !resultUi) return;
  balanceUi.classList.add("display-block");
  resultUi.classList.add("display-flex");
}

// Get todays date
function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(1, "0");
  const mm = String(today.getMonth() + 1).padStart(1, "0");
  const yy = today.getFullYear().toString().slice(-2);
  return `${dd}/${mm}/${yy}`;
}

// collect all functions related to getting totals
function updateTotals() {
  getTotalExpense();
  getTotalIncome();
  getTotalBalance();
}

// Get total
function getTotalExpense() {
  if (!expenseTotal) return;
  totalExpense = 0;
  const getAmounts = document.querySelectorAll("#etExpense .amount");
  getAmounts.forEach((amount) => {
    const currentAmount = parseFloat(amount.innerHTML);
    totalExpense += currentAmount;
  });
  expenseTotal.textContent = `${totalExpense}`;
}

// Get total
function getTotalIncome() {
  if (!incomeTotal) return;
  totalIncome = 0;
  // might want to check if my element exists
  const getAmounts = document.querySelectorAll("#etIncome .amount");

  getAmounts.forEach((amount) => {
    const currentAmount = parseFloat(amount.innerHTML);
    totalIncome += currentAmount;
  });
  incomeTotal.textContent = `${totalIncome}`;
}

// Balance total
function getTotalBalance() {
  if (!balanceTotal) return;
  totalBalance = totalIncome - totalExpense;
  balanceTotal.textContent = `${totalBalance}`;
  if (totalBalance <= -1) {
    balanceTotal.classList.add("negative");
  } else {
    balanceTotal.classList.remove("negative");
  }
}
