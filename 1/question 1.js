import input from "./input.js";

const result = input.split("\n").reduce((acc, line) => {
  const firstDigit = line.match(/^.*?(\d)/)?.[1];
  const lastDigit = line.match(/^.*(\d)/)?.[1];
  if (!firstDigit || !lastDigit)
    throw new Error(`No first or last digit found in ${line}`);
  const number = +(firstDigit + lastDigit);
  return acc + number;
}, 0);

console.log(result);
