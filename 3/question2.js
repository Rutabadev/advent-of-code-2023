import input from "./input.js";

export function computeAnswer() {
  const twoDimensionalInput = input.split("\n").map((line) => line.split(""));
  const numberRegex = /\d+/g;
  const digitRegex = /\d/;
  const gearRegex = /\*/g;
  let result = 0;

  const numbersPositions = [];
  twoDimensionalInput.forEach((line, y) => {
    const lineString = line.join("");
    let match;
    while ((match = numberRegex.exec(lineString)) !== null) {
      const [start, end] = [match.index, match.index + match[0].length];
      numbersPositions.push({
        start,
        end,
        y,
        value: +match[0],
      });
    }
  });

  twoDimensionalInput.forEach((line, y) => {
    const lineString = line.join("");
    let match;
    while ((match = gearRegex.exec(lineString)) !== null) {
      const [start, end] = [match.index, match.index + match[0].length];
      const [previousXIndex, nextXIndex] = [
        Math.max(start - 1, 0),
        Math.min(end, lineString.length - 1),
      ];

      const adjacentDigits = [];
      // left
      twoDimensionalInput[y][previousXIndex].match(digitRegex) &&
        adjacentDigits.push({ x: previousXIndex, y });
      // right
      twoDimensionalInput[y][nextXIndex].match(digitRegex) &&
        adjacentDigits.push({ x: nextXIndex, y });
      // top (multiple)
      if (y !== 0) {
        twoDimensionalInput[y - 1]
          .slice(previousXIndex, nextXIndex + 1)
          .forEach((character, i) => {
            if (character.match(digitRegex)) {
              adjacentDigits.push({
                x: previousXIndex + i,
                y: y - 1,
              });
            }
          });
      }
      // bottom (multiple)
      if (y !== twoDimensionalInput.length) {
        twoDimensionalInput[y + 1]
          .slice(previousXIndex, nextXIndex + 1)
          .forEach((character, i) => {
            if (character.match(digitRegex)) {
              adjacentDigits.push({
                x: previousXIndex + i,
                y: y + 1,
              });
            }
          });
      }

      const adjacentNumbers = adjacentDigits.reduce((acc, adjacentDigit) => {
        const correspondingNumber = numbersPositions.find(
          (number) =>
            number.y === adjacentDigit.y &&
            number.start <= adjacentDigit.x &&
            number.end >= adjacentDigit.x,
        );

        return acc.add(correspondingNumber);
      }, new Set());

      if (adjacentNumbers.size === 2) {
        result += [...adjacentNumbers][0].value * [...adjacentNumbers][1].value;
      }
    }
  });
  console.log(result);
  return result;
}
