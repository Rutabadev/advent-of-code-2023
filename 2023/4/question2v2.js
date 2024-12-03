import input from "./input.js";
import { extractCardNumber, getWinsForCard } from "./question1.js";

export function computeAnswer() {
  let lines = input.split("\n");

  const cards = lines.reduce((acc, line) => {
    acc[extractCardNumber(line)] = {
      result: getWinsForCard(line),
      number: 1,
    };
    return acc;
  }, {});
  for (let key in cards) {
    const card = cards[key];
    let result = card.result;
    while (result !== 0) {
      cards[+key + result].number += card.number;
      result--;
    }
  }
  const result = Object.values(cards).reduce(
    (acc, card) => (acc += card.number),
    0,
  );
  console.log(result);
  return result;
}
