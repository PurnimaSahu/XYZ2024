'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// const a=accounts.find(function(acc)
// {
// return acc.owner=='Jonas Schmedtmann'
// })
// console.log(a)

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const logoutButton=document.querySelector(".btn")

////////////////////

function displayMovement(acc)
{
  containerMovements.innerHTML="";



acc.movements.forEach(function(mov,i)
{
  // console.log(` ${i}   ${mov}`)

  const type=mov>0?'deposit':'withdrawal'
  const html=`<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
  <div class="movements__value">${mov}</div>
</div>`

containerMovements.insertAdjacentHTML("afterbegin",html)
})


// console.log(containerMovements)
}


// const user='Jonas Schmedtmann';
// console.log(user)
// const username=user.toLowerCase().split(" ")
// let sum=""
// username.forEach(function(un)
// {
//  sum=sum+un[0]
// return sum

// })
// const user='Jonas Schmedtmann';
// const username=user.toLowerCase().split(" ").map(function(u)
// {
//   return u[0]
// }).join("")


// account1.user=username
// console.log(account1)

const createUsername=function(account)
{
account.forEach(function(acc)
{
  acc.username=acc.owner.toLowerCase().split(" ").map(function(u)
  {
    return u[0]
  }).join("")
  
})
}
createUsername(accounts)
console.log(accounts)
//////////////////////
// function  calcDisplayBalance(acc)
// {
//   labelBalance.textContent=`${sum-Math.abs(withdrawalSum)}`
// }

/////////////////////////////
function calcDisplaySummary(acc)
{
  const sum =acc.movements.filter(mov =>mov>0
).reduce((acc,mov) =>acc+mov
,0)
labelSumIn.textContent=`${sum}`
 
const withdrawalSum =acc.movements.filter(mov => mov<0)
.reduce((acc,mov)=> (acc+mov),0)

labelSumOut.textContent=`${Math.abs(withdrawalSum)}`

const interest=acc.movements.filter(function(mov)
{
  return mov>0
}).map(function(mov)
{
  return mov*acc.interestRate/100
}).filter(int=> int>1).reduce((acc,int)=>
  acc+int
,0)

labelSumInterest.textContent=`${interest}`
 labelBalance.textContent=`${sum-Math.abs(withdrawalSum)}`

}
let currentAccount;

btnLogin.addEventListener("click",function(e)
{
  e.preventDefault()
  currentAccount=accounts.find((acc)=> acc.username==inputLoginUsername.value)
  console.log(currentAccount)
  if(currentAccount?.pin==Number(inputLoginPin.value))
  {
    containerApp.style.opacity=100
    console.log("login")
    labelWelcome.textContent=`Welcome ${currentAccount.owner}`
    inputLoginUsername.value=""
    inputLoginPin.value=""

    displayMovement(currentAccount)
    calcDisplaySummary(currentAccount)
    // calcDisplayBalance(currentAccount)

  }
  else{
    containerApp.style.opacity=0
  }
})
logoutButton.addEventListener("click",function()
{
  containerApp.style.opacity=0
})
let transferTo;
btnTransfer.addEventListener("click",function(e)
{
  e.preventDefault()
  transferTo=accounts.find((acc)=>inputTransferTo.value==acc.username
   
  
  )
  if(transferTo.username==inputTransferTo.value)
  {
console.log(inputTransferAmount.value)
transferTo.movements.push(Number(inputTransferAmount.value))
console.log(transferTo.movements)
  }
  // console.log(inputTransferTo.value)
  // console.log(transferTo)
})





