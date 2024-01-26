import input from "./input.js";

const dig = (line) => {
  return line.flatMap((number, i, arr) =>
    i === arr.length - 1 ? [] : [arr[i + 1] - number],
  );
};

export function computeAnswer() {
  const result = input.split("\n").reduce((acc, curr) => {
    let currentLine = curr.split(" ").map(Number);
    const history = [currentLine];
    while (currentLine.some((x) => x !== 0)) {
      currentLine = dig(currentLine);
      history.push(currentLine);
    }
    history[history.length - 1].push(0);
    for (let i = history.length - 2; i > -1; i--) {
      const currentSequence = history[i];
      const previousSequence = history[i + 1];
      currentSequence.push(currentSequence.at(-1) + previousSequence.at(-1));
    }
    return acc + history[0][history[0].length - 1];
  }, 0);
  return result;
}
