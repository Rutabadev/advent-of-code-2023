import input from "./input.js";

export function computeAnswer() {
  const twoDimensionalInput = input.split("\n").map((line) => line.split(""));
  const numberRegex = /\d+/g;
  const symbolRegex = /[^\d|.]/;
  let result = 0;

  twoDimensionalInput.forEach((line, y) => {
    const lineString = line.join("");
    let match;
    while ((match = numberRegex.exec(lineString)) !== null) {
      const [start, end] = [match.index, match.index + match[0].length];
      const [previousXIndex, nextXIndex] = [
        Math.max(start - 1, 0),
        Math.min(end, lineString.length - 1),
      ];

      const hasSymbolToTheLeft =
        twoDimensionalInput[y][previousXIndex].match(symbolRegex);
      const hasSymbolToTheRight =
        twoDimensionalInput[y][nextXIndex].match(symbolRegex);
      const hasSymbolAbove =
        y === 0
          ? false
          : twoDimensionalInput[y - 1]
              .slice(previousXIndex, nextXIndex + 1)
              .some((character) => character.match(symbolRegex));
      const hasSymbolBelow =
        y === twoDimensionalInput.length - 1
          ? false
          : twoDimensionalInput[y + 1]
              .slice(previousXIndex, nextXIndex + 1)
              .some((character) => character.match(symbolRegex));

      if (
        [
          hasSymbolToTheLeft,
          hasSymbolToTheRight,
          hasSymbolAbove,
          hasSymbolBelow,
        ].some((hasSymbol) => hasSymbol)
      ) {
        result += +match[0];
      }
    }
  });
  console.log(result);
  return result;
}
