import input from "./input.js";

const getPGCD = (num1, num2) => {
  // Euclide's algorythm
  let small = Math.min(num1, num2);
  let big = Math.max(num1, num2);
  while (big % small !== 0) {
    const newBig = big % small;
    big = Math.max(newBig, small);
    small = Math.min(newBig, small);
  }
  return small;
};

const getLCM = (num1, num2) => {
  return (num1 * num2) / getPGCD(num1, num2);
};

export function computeAnswer() {
  let [instructions, , ...nodes] = input.split("\n");
  nodes = nodes.reduce((acc, node) => {
    const { key, L, R } = node.match(
      /(?<key>...) = \((?<L>...), (?<R>...)\)/,
    )?.groups;
    acc[key] = { L, R };
    return acc;
  }, {});
  // Each starting node hit a node ending in Z on a cyclic basis (every X moves)
  // Find all cycles length and compute the least common multiple (LCM)
  let workingNodes = Object.keys(nodes).filter((node) => node.endsWith("A"));
  const cycleLengths = workingNodes.map((node) => {
    let instructionCursor = -1;
    let count = 0;
    while (!node.endsWith("Z")) {
      count++;
      instructionCursor++;
      if (instructionCursor >= instructions.length) instructionCursor = 0;
      const currentInstuction = instructions[instructionCursor];
      const currentNode = nodes[node];
      node = currentNode[currentInstuction];
    }
    return count;
  });
  return cycleLengths.reduce((acc, curr) => {
    return getLCM(acc, curr);
  });
}
