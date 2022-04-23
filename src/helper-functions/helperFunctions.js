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
