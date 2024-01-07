import input from "./input.js";

const determineWinningHoldTimes = (time, record) => {
  const winningHoldTimes = [];
  // not checking first and last values 'cause the boat doesn't move in these situations
  // seems like the winning hold times are normally distributed,
  // so let find only the first winning hold time, then we infer the last by symmetry and count in between
  for (let holdTimeOrSpeed = 1; holdTimeOrSpeed < time - 1; holdTimeOrSpeed++) {
    const remainingTime = time - holdTimeOrSpeed;
    const distanceTravelled = remainingTime * holdTimeOrSpeed;
    if (distanceTravelled > record) {
      winningHoldTimes.push(holdTimeOrSpeed);
      winningHoldTimes.push(time - holdTimeOrSpeed);
      break;
    }
  }
  return winningHoldTimes;
};

export function computeAnswer() {
  const lines = input.split("\n");
  const time = lines[0].split(" ").filter(Number).join("");
  const distance = lines[1].split(" ").filter(Number).join("");

  const winningHoldTimes = determineWinningHoldTimes(time, distance);
  console.log(winningHoldTimes);

  return winningHoldTimes[1] - winningHoldTimes[0] + 1;
}
