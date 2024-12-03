import input from "./input.js";

const determineWinningHoldTimes = (time, record) => {
  const winningHoldTimes = [];
  // not checking first and last values 'cause the boat doesn't move in these situations
  for (let holdTimeOrSpeed = 1; holdTimeOrSpeed < time - 1; holdTimeOrSpeed++) {
    const remainingTime = time - holdTimeOrSpeed;
    const distanceTravelled = remainingTime * holdTimeOrSpeed;
    if (distanceTravelled > record) {
      winningHoldTimes.push(holdTimeOrSpeed);
    }
  }
  return winningHoldTimes;
};

export function computeAnswer() {
  const lines = input.split("\n");
  const time = lines[0].split(" ").filter(Number).join("");
  const distance = lines[1].split(" ").filter(Number).join("");

  const winningHoldTimes = determineWinningHoldTimes(time, distance);

  return winningHoldTimes.length;
}
