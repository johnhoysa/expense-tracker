// et prefix short for expense tracker
// get data from inputs
const etType = document.getElementById("etType");
const etDesc = document.getElementById("etDesc");
const etAmount = document.getElementById("etAmount");
const etAdd = document.getElementById("etAdd");
// display data
const etExpense = document.querySelector("#etExpense section");
const etIncome = document.querySelector("#etIncome section");
let expenseTotal = document.getElementById("expenseTotal");
let incomeTotal = document.getElementById("incomeTotal");

// when user clicks Add run a function
etAdd.addEventListener("click", () => {
  addItem();
  getTotalExpense();
  getTotalIncome();
});

// the function to run after clicking add
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
        <li><button class="deleteEt" type="submit">Delete</button></li>
    </ul>
    `;

  // Tell data where to go
  if (type === "expense") {
    etExpense.innerHTML += currentEt;
  } else {
    etIncome.innerHTML += currentEt;
  }
}

// Get total
function getTotalExpense() {
  // might want to check if my element exists
  let getAmounts = document.querySelectorAll("#etExpense .amount");
  let totalExpense = 0;
  getAmounts.forEach(function (amount) {
    currentAmount = parseFloat(amount.innerHTML);
    totalExpense += parseFloat(currentAmount);
  });
  document.getElementById("expenseTotal").textContent = `${totalExpense}`;
}

// Get total
function getTotalIncome() {
  // might want to check if my element exists
  let getAmounts = document.querySelectorAll("#etIncome .amount");
  let totalIncome = 0;
  getAmounts.forEach(function (amount) {
    currentAmount = parseFloat(amount.innerHTML);
    totalIncome += parseFloat(currentAmount);
  });
  document.getElementById("incomeTotal").textContent = `${totalIncome}`;
}
