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
  } else {
    console.log("no gender given");
  }
}