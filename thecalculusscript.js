let calcArr = [];
let memory = '';
let theinput = document.getElementById('inputid');

// Memory buttons handlers

function memClear(event) {
  memory = ''
}

function memStore(event) {
  memory = theinput.value;
  
}

function memRead(event) {
  theinput.value = memory;
}

function memPlus(event) {
  memory = String(+memory + +theinput.value);
}

function memMinus(event) {
  memory = String(+memory - +theinput.value);
}

// Only numbers allowed function

function validate(event) {
  let key = event.key;
  let regex = /[0-9]|\./;
  if (!regex.test(key)) {
    event.preventDefault();
  }
}

// Number button click handler

function numClick(event) {
  if (
    event.target.tagName != 'BUTTON' ||
    (event.target.innerHTML == '.' && theinput.value.includes('.'))
  )
    return false;
  theinput.value = theinput.value + event.target.innerHTML;
}

function clearInput(event) {
  theinput.value = '';
}

function backspace(event) {
  theinput.value = theinput.value.slice(0, -1);
}

// Handler for ("+", "-", "*", "/") binary operators

function operAction(event) {
  if (
    calcArr.length > 0 &&
    isNaN(+calcArr[calcArr.length - 1]) &&
    !theinput.value
  )
    return false;
  calcArr.push(+theinput.value);
  calcArr.push(event.target.innerHTML);
  theinput.value = '';
  console.log(calcArr);
}

// "±" handler

function negate(event) {
  if (!theinput.value) return false;
  if (theinput.value.startsWith('-')) {
    theinput.value = theinput.value.slice(1);
  } else {
    theinput.value = '-' + theinput.value;
  }
}

// "%" handler

function percent(event) {
  if (calcArr.length == 0) {
    theinput.value = '0';
  }

  theinput.value = calcArr[calcArr.length - 2] * (theinput.value / 100);
}

// "√" handler

function square(event) {
  theinput.value = theinput.value ** (1 / 2);
}

// "1/x" handler

function onedivision(event) {
  theinput.value = 1 / +theinput.value;
}

// Calculating function ("=" handler)

function resultfunc(event) {
  if (!theinput.value) return false;
  calcArr.push(+theinput.value);
  for (let i = 0; i <= calcArr.length; i++) {
    if (calcArr[i] == '+') {
      calcArr[i + 1] = +calcArr[i - 1] + +calcArr[i + 1];
      console.log(calcArr[i + 1]);
    } else if (calcArr[i] == '-') {
      calcArr[i + 1] = +calcArr[i - 1] - +calcArr[i + 1];
      console.log(calcArr[i + 1]);
    } else if (calcArr[i] == '*') {
      calcArr[i + 1] = +calcArr[i - 1] * +calcArr[i + 1];
      console.log(calcArr[i + 1]);
    } else if (calcArr[i] == '/') {
      calcArr[i + 1] = +calcArr[i - 1] / +calcArr[i + 1];
      console.log(calcArr[i + 1]);
    }
  }

  theinput.value = calcArr[calcArr.length - 1];
  console.log(theinput.value);
  calcArr = [];
}
