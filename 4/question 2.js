import input from "./input.js";

const extractCardNumber = (line) => {
  const cardNumber = +(line.match(/Card +(\d+)/)?.[1] ?? "");
  if (!cardNumber) throw "current card number not found";
  return cardNumber;
};

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

    let result = 0;
    for (let winningNumber of winningNumbers) {
      if (numbers.includes(winningNumber)) {
        result++;
      }
    }

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
