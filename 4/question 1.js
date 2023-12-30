import input from "./input.js";

export function computeAnswer() {
  return input
    .split("\n")
    .map((line) => ({
      winningNumbers:
        line
          .match(/Card +\d+: (.+) \|/)?.[1]
          .split(" ")
          .filter(Boolean) || [],
      numbers:
        line
          .match(/\| (.+)/)?.[1]
          .split(" ")
          .filter(Boolean) || [],
    }))
    .reduce((acc, { winningNumbers, numbers }) => {
      let result = 0;
      for (let winningNumber of winningNumbers) {
        if (numbers.includes(winningNumber)) {
          result === 0 ? (result = 1) : (result *= 2);
        }
      }
      return acc + result;
    }, 0);
}

console.log(computeAnswer());
