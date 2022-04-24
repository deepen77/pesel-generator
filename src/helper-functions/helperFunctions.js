export function isBornBefore2000(RRMMDD, enteredValues) {
  if (Number(enteredValues.toString().substring(0, 4)) > 1999) {
    let month = Number(enteredValues.toString().substring(4, 6));
    let modifiedMonth = (month + 20).toString();
    let year = enteredValues.toString().substring(2, 4);
    let day = enteredValues.toString().substring(6, 8);
    RRMMDD = year + modifiedMonth + day;
  } else {
    RRMMDD = enteredValues.toString().substring(2);
  }
  return (RRMMDD = Array.from(String(RRMMDD), Number));
}


export function randomPPPNum(arr) {
  for (let i = 0; i < 3; i++) {
    arr.push(Math.floor(Math.random() * 9) + 0);
  }
  return arr;
}

export function genderNumberGenerator(gender) {
  if (gender === "W") {
    const arrayWoman = [0, 2, 4, 6, 8];
    const randomWoman = arrayWoman[(Math.random() * arrayWoman.length) | 0];
    return Array.from(String(randomWoman), Number);
  } else if (gender === "M") {
    const arrayMan = [1, 3, 5, 7, 9];
    const randomMan = arrayMan[(Math.random() * arrayMan.length) | 0];
    return Array.from(String(randomMan), Number);
  } 
}


//algorithm from gov.pl to generete control number (K)
// 1. Multiply each digit of the PESEL number by the appropriate weight: 1-3-7-9-1-3-7-9-1-3

export function multiplyByTemplate(arr1) {
  const template = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  return arr1.map((e, index) => e * template[index]);
}

// 2. removing 2digit numbers and replaced by last one only

export function modifyArray(arr1) {
  let modifiedArray = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].toString().length > 1) {
      modifiedArray.push(Number(arr1[i].toString().substring(1)));
    } else {
      modifiedArray.push(arr1[i]);
    }
  }
  return modifiedArray;
}

// 3. sum of Array and removing first digit if nuber contain 2 digits

export function sumOfArray(correctedArray) {
    let sum = correctedArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    if (sum.toString().length > 1) {
      sum = Number(sum.toString().substring(1));
      if (sum === 0) {
        sum = 10;
      }
      return sum
    }
}

// 4. generating a number by subtracting the sum from 10

export function generateControlNumber(sum) {
    const constTemplateNumber = 10;
    return constTemplateNumber - sum;
}
