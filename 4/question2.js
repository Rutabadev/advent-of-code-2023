import input from "./input.js";
import { extractCardNumber, getWinsForCard } from "./question1.js";

const cache = {};

export function computeAnswer() {
  let lines = input.split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const currentCardNumber = extractCardNumber(line);
    if (cache[currentCardNumber]) {
      lines.push(...cache[currentCardNumber]);
      continue;
    }

    let result = getWinsForCard(line);

    const addedCards = [];
    while (result > 0) {
      const addedCard = lines.find((card) =>
        card.match(new RegExp(`Card +${currentCardNumber + result}`)),
      );
      if (!addedCard)
        throw `could not find card number ${
          currentCardNumber + result
        } to add (currentLineNumber: ${currentCardNumber}, result: ${result})`;
      addedCards.push(addedCard);
      result--;
    }

    lines.push(...addedCards);
    cache[currentCardNumber] = addedCards;
  }

  return lines.length;
}

console.log(computeAnswer());
