import input from "./input.js";

/**
 *
 * @param {string} input
 */
function computeAnswer(input) {
  // extract and sort columns
  const col1 = input.match(/^\d+/gm).sort((a, b) => a - b);
  const col2 = input.match(/\d+$/gm).sort((a, b) => a - b);

  let sum = 0;
  // sum all differences
  for (let i = 0; i < col1.length; i++) {
    // get difference between each lines
    sum += Math.abs(col1[i] - col2[i]);
  }

  return sum;
}

console.log(computeAnswer(input));
