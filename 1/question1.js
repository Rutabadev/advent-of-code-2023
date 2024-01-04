import input from "./input.js";

export function computeAnswer() {
  const result = input.split("\n").reduce((acc, line) => {
    const firstDigit = line.match(/^.*?(\d)/)?.[1]; // putting ? at the end of ".*?" makes it non greedy and match as little as possible
    const lastDigit = line.match(/^.*(\d)/)?.[1];
    if (!firstDigit || !lastDigit)
      throw new Error(`No first or last digit found in ${line}`);
    const number = +(firstDigit + lastDigit);
    return acc + number;
  }, 0);
  console.log(result);
  return result;
}
