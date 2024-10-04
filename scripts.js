// et prefix short for expense tracker
// get user inputted data
const etType = document.getElementById("etType");
const etDesc = document.getElementById("etDesc");
const etAmount = document.getElementById("etAmount");
const etAdd = document.getElementById("etAdd");
let etDeleteButtons;
// display data
const etExpense = document.querySelector("#etExpense section");
const etIncome = document.querySelector("#etIncome section");
let expenseTotal = document.getElementById("expenseTotal");
let incomeTotal = document.getElementById("incomeTotal");

// do math
let totalExpense;
let totalIncome;
let totalBalance;
let balanceTotal = document.getElementById("balanceTotal");

// when user clicks Add run theses function
etAdd.addEventListener("click", () => {
  addItem();
  resetForm();
  getTotalExpense();
  getTotalIncome();
  getTotalBalance();
});

// run after clicking add
function addItem() {
  // get values to add
  let type = etType.value;
  let desc = etDesc.value;
  let amount = etAmount.value;
  // get date and format it
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  // Create data to display
  let currentEt = `
    <ul class="result-content">
        <li class="desc">${desc}</li>
        <li class="amount">${amount}</li>
        <li class="date">${today}</li>
        <li><button class="etDelete" type="submit">Delete</button></li>
    </ul>
    `;

  // Tell data where to go
  if (type === "expense") {
    etExpense.innerHTML += currentEt;
  } else {
    etIncome.innerHTML += currentEt;
  }
}

// run after clicking Delete

function resetForm() {
  etType.value = "expense";
  etDesc.value = "";
  etAmount.value = "";
}
// Get total
function getTotalExpense() {
  totalExpense = 0;
  // might want to check if my element exists
  let getAmounts = document.querySelectorAll("#etExpense .amount");
  getAmounts.forEach(function (amount) {
    currentAmount = parseFloat(amount.innerHTML);
    totalExpense += parseFloat(currentAmount);
  });
  document.getElementById("expenseTotal").textContent = `${totalExpense}`;
}

// Get total
function getTotalIncome() {
  totalIncome = 0;
  // might want to check if my element exists
  let getAmounts = document.querySelectorAll("#etIncome .amount");

  getAmounts.forEach(function (amount) {
    currentAmount = parseFloat(amount.innerHTML);
    totalIncome += parseFloat(currentAmount);
  });
  document.getElementById("incomeTotal").textContent = `${totalIncome}`;
}

// Balance total
function getTotalBalance() {
  totalBalance = 0;
  // get total from income and expense. Show total even if negative

  totalBalance = totalIncome - totalExpense;
  document.getElementById("balanceTotal").textContent = `${totalBalance}`;
}
