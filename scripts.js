// et prefix short for expense tracker
// create variables
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
const instructionsUi = document.getElementById("instructions");
const balanceUi = document.getElementById("balance");
const resultUi = document.querySelector(".results");
const expenseUi = document.getElementById("etExpense");
const incomeUi = document.getElementById("etIncome");

// help with calculations
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
    deleteItem();
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

  // Save items to localStorage
  const item = { desc, amount, date: formattedDate };
  let items = JSON.parse(localStorage.getItem(type)) || [];
  items.push(item);
  localStorage.setItem(type, JSON.stringify(items));

  // create content to display
  const currentEt = `
    <ul class="result-content fade-in">
        <li class="desc">${desc}</li>
        <li class="amount">${amount}$</li>
        <li class="date">${formattedDate}</li>
        <li><button class="etDelete" type="submit">Delete</button></li>
    </ul>
    `;

  // tell content where to go
  if (type === "expense") {
    etExpense.innerHTML += currentEt;
    expenseUi.classList.add("display-block", "fade-in");
  } else {
    etIncome.innerHTML += currentEt;
    incomeUi.classList.add("display-block", "fade-in");
  }
}

// If user clicks delete do the following
function deleteItem() {
  const elements = document.querySelectorAll(".etDelete");
  elements.forEach((element) => {
    element.addEventListener("click", function () {
      // get element then parent element
      const li = this.parentElement;
      const ul = li.parentElement;
      //
      ul.classList.remove("fade-in");
      ul.classList.add("fade-out");
      //
      setTimeout(() => {
        ul.remove();
        // get new totals
        updateTotals();
      }, 1000);
    });
  });
}

// reset form fields and focus back to description field
function resetForm() {
  if (!etType || !etDesc || !etAmount) return;
  etType.value = "expense";
  etDesc.value = "";
  etAmount.value = "";
  // focus back on description
  etDesc.focus();
}

// fade items in or out as data is displayed
function displayUi() {
  if (!balanceUi || !resultUi) return;
  instructionsUi.classList.add("fade-out");
  balanceUi.classList.add("display-block", "fade-in");
  balanceUi.classList.add("display-block", "fade-in");
  resultUi.classList.add("display-flex", "fade-in");
}

// get todays date and format it
//WHY IS THIS HERE?
function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(1, "0");
  const mm = String(today.getMonth() + 1).padStart(1, "0");
  const yy = today.getFullYear().toString().slice(-2);
  return `${dd}/${mm}/${yy}`;
}

// collect function related to totals
function updateTotals() {
  getTotalExpense();
  getTotalIncome();
  getTotalBalance();
}

// expense, get total
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

// income, get total
function getTotalIncome() {
  if (!incomeTotal) return;
  totalIncome = 0;
  const getAmounts = document.querySelectorAll("#etIncome .amount");
  getAmounts.forEach((amount) => {
    const currentAmount = parseFloat(amount.innerHTML);
    totalIncome += currentAmount;
  });
  incomeTotal.textContent = `${totalIncome}`;
}

// balance, get total
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
