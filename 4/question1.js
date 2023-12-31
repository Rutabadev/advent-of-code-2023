import input from "./input.js";

export const extractCardNumber = (line) => {
  const cardNumber = +(line.match(/Card +(\d+)/)?.[1] ?? "");
  if (!cardNumber) throw "current card number not found";
  return cardNumber;
};

export const getWinsForCard = (line) => {
  const winningNumbers =
    line
      .match(/Card +\d+: (.+) \|/)?.[1]
      .split(" ")
      .filter(Boolean) || [];
  const numbers =
    line
      .match(/\| (.+)/)?.[1]
      .split(" ")
      .filter(Boolean) || [];

  let wins = 0;
  for (let winningNumber of winningNumbers) {
    if (numbers.includes(winningNumber)) {
      wins++;
    }
  }
  return wins;
};

export function computeAnswer() {
  return input.split("\n").reduce((acc, line) => {
    let wins = getWinsForCard(line);
    let score = 0;
    while (wins) {
      score === 0 ? (score = 1) : (score *= 2);
      wins--;
    }
    return acc + score;
  }, 0);
}

console.log(computeAnswer());
