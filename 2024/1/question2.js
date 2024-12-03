import input from "./input.js";

/**
 *
 * @param {string} input
 */
function computeAnswer(input) {
  // extract columns
  const col1 = input.match(/^\d+/gm).map((x) => +x);
  const col2 = input.match(/\d+$/gm).map((x) => +x);

  let sum = 0;
  // sum all differences
  for (let i = 0; i < col1.length; i++) {
    // check how many times col1[i] appear in col2
    const col2Times = col2.filter((x) => x === col1[i]).length;
    sum += col1[i] * col2Times;
  }

  return sum;
}

console.log(computeAnswer(input));
