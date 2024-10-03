// et prefix short for expense tracker
// get data from inputs
const etType = document.getElementById("etType");
const etDesc = document.getElementById("etDesc");
const etAmount = document.getElementById("etAmount");
const etAdd = document.getElementById("etAdd");
// display data
const etExpense = document.querySelector("#etExpense section");
const etIncome = document.querySelector("#etIncome section");

// when user clicks Add run a function
etAdd.addEventListener("click", () => {
  addItem();
  getTotalExpense();
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

  let currentEt = `
    <ul class="result-content">
        <li class="desc">${desc}</li>
        <li class="amount">${amount}</li>
        <li class="date">${today}</li>
        <li><button id="deleteEt" type="submit">Delete</button></li>
    </ul>
    `;

  if (type === "expense") {
    etExpense.innerHTML += currentEt;
  } else {
    etIncome.innerHTML += currentEt;
  }
}

function getTotalExpense() {
  // might want to check if my element exists
  // get each amount add it together
  let getAmounts = document.querySelectorAll("#etExpense .amount");
  console.log("what is my total? ", getAmounts);
}
