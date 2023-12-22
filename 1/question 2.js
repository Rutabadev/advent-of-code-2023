import input from "./input.js";

const digits = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const result = input.split("\n").reduce((acc, line) => {
  const stringDigits = Object.keys(digits);
  let firstDigit = line.match(
    new RegExp(`^.*?(\\d|${stringDigits.join("|")})`),
  )?.[1];
  let lastDigit = line.match(
    new RegExp(`^.*(\\d|${stringDigits.join("|")})`),
  )?.[1];
  if (!firstDigit || !lastDigit)
    throw new Error(`No first or last digit found in ${line}`);
  [firstDigit, lastDigit] = [firstDigit, lastDigit].map((digit) => {
    if (digit.length > 1) {
      // digit is a word
      return digits[/** @type {keyof typeof digits} */ (digit)];
    }
    // digit is a number
    return digit;
  });
  const number = +(firstDigit + lastDigit);
  return acc + number;
}, 0);

console.log(result);
