import input from "./input.js";

export function computeAnswer() {
  let [instructions, , ...nodes] = input.split("\n");
  nodes = nodes.reduce((acc, node) => {
    const { key, L, R } = node.match(
      /(?<key>...) = \((?<L>...), (?<R>...)\)/,
    )?.groups;
    acc[key] = { L, R };
    return acc;
  }, {});
  let node = "AAA";
  let instructionCursor = -1;
  let count = 0;
  while (node !== "ZZZ") {
    count++;
    instructionCursor++;
    if (instructionCursor >= instructions.length) instructionCursor = 0;
    const currentInstuction = instructions[instructionCursor];
    const currentNode = nodes[node];
    node = currentNode[currentInstuction];
  }
  return count;
}
