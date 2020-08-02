// HTML ELEMENTS
let generateBtn = document.querySelector("#generate");
let $passwordText = document.querySelector("#password");
let $range = document.getElementById("pwdLengthRange");
let $pwdBackground = document.getElementById("pwdBackground");
let $pwdLength = document.querySelector("#pwdLength.bubble");
let $strengthSymbol = document.getElementById("strengthSymbol");
let $strengthText = document.getElementById("strengthText");
let $letters = document.getElementById("letters");
let $form = document.querySelector("form");
let $mixed = document.getElementById("mixedcase");
let $punctuations = document.getElementById("punctuations");
let $numbers = document.getElementById("numbers");
let $repeatingchars = document.getElementById("repeatingchars");
let $copybtn = document.getElementById("copybtn");


let charArray = [];


//event listener for form controls
$form.addEventListener("click", function (event) {
  let elementId = event.target.id;
  let $target = event.target;
  event.stopPropagation();
  charArray = [];
  if (event.target.matches("input") || event.target.matches("button") || event.target.matches(".fa.fa-refresh")) {

    if (event.target.id === "pwdLengthRange" || event.target.id === "copybtn") {
      return;
    }
    if (event.target.id === "regenerate") {
      if ($letters.checked || $mixed.checked || $punctuations.checked || $numbers.checked) {
        buildCharArray();
        generatePassword();
      }
      return;
    }
    if (event.target.id === "letters") {
      if ($target.checked === false) {
        $mixed.checked = false;
        $mixed.disabled = true;
      }
      else {
        $mixed.disabled = false;

      }
    }
    if ($letters.checked || $mixed.checked || $punctuations.checked || $numbers.checked) {
      buildCharArray();
      generatePassword();
    }
    else {
      $passwordText.value = "";
    }
  }
});


// Event listener for range control.
$range.addEventListener("input", function () {
  if ($range.value < 8) {
    $range.value = 8;
  }
  $pwdLength.textContent = $range.value;
  if ($range.value >= 8 && $range.value < 11) {
    $pwdBackground.style.backgroundColor = "#ce422d";
    $pwdLength.style.backgroundColor = "#ce422d";
    $strengthSymbol.innerHtml = "<i class='fa fa-exclamation-circle' aria-hidden='true'></i>";
    $strengthText.innerText = " Weak"
  }
  else {
    $pwdBackground.style.backgroundColor = "#58a957";
    $pwdLength.style.backgroundColor = "#58a957";
    $strengthSymbol.innerHtml = "<i class='fa fa-check-circle' aria-hidden='true'></i>";
    $strengthText.innerText = " Strong"
  }
  if ($letters.checked || $mixed.checked || $punctuations.checked || $numbers.checked) {
    buildCharArray();
    generatePassword();
  }
});

$copybtn.onclick = function () {
  if ($passwordText.value !== "") {
    $passwordText.select();
    document.execCommand("copy");
  }
}

function generatePassword() {
  let pwd = "";

  if ($repeatingchars.checked === true) {
    for (let i = 0; i < parseInt($range.value); i++) {
      pwd = pwd + charArray[Math.floor(Math.random() * charArray.length)];
    }
  }
  else {
    let lastChar = "";
    while (pwd.length < parseInt($range.value)) {
      let newChar = charArray[Math.floor(Math.random() * charArray.length)];
      if (newChar === lastChar) {
        continue;
      }
      else {
        pwd = pwd + newChar;
        lastChar = newChar;
      }
    }
  }
  $passwordText.value = pwd;
}

function buildCharArray() {
  if ($letters.checked === true) {
    charArray.push.apply(charArray, Array.from("abcdefghijklmnopqrstuvwxyz"));
  }
  if ($mixed.checked === true) {
    charArray.push.apply(charArray, Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
  }
  if ($punctuations.checked === true) {
    charArray.push.apply(charArray, Array.from("!@#$%^&*-_+=.?"));
  }
  if ($numbers.checked === true) {
    charArray.push.apply(charArray, Array.from("0123456789"));
  }
}

$(document).ready(function () {
  buildCharArray();
  generatePassword();
});