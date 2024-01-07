import input from "./input.js";

/** When there is no middle use the upper one */
const getMiddleValue = (value1, value2) => Math.round((value1 + value2) / 2);

const getDistanceTravelled = (holdTimeOrSpeed, time) => {
  const remainingTime = time - holdTimeOrSpeed;
  return remainingTime * holdTimeOrSpeed;
};

const determineWinningHoldTimes = (time, record) => {
  /* Not checking first and last values 'cause the boat doesn't move in these situations */
  /* Seems like the winning hold times are normally distributed,
     so let find only the first winning hold time, then we infer the last by symmetry and count in between */
  /* We can find the first one faster by looking down from the middle via binary search */
  const middleTime = Math.trunc(time / 2);
  let firstWinningHoldTime = undefined;
  let maxValue = middleTime;
  let minValue = 1;
  while (!firstWinningHoldTime) {
    const holdTimeOrSpeed = getMiddleValue(minValue, maxValue);
    const distanceTravelled = getDistanceTravelled(holdTimeOrSpeed, time);
    if (minValue + 1 === maxValue) {
      firstWinningHoldTime = maxValue;
    }
    if (distanceTravelled < record) {
      minValue = holdTimeOrSpeed;
    }
    if (distanceTravelled > record) {
      maxValue = holdTimeOrSpeed;
    }
  }
  return [firstWinningHoldTime, time - firstWinningHoldTime];
};

export function computeAnswer() {
  const lines = input.split("\n");
  const time = +lines[0].split(" ").filter(Number).join("");
  const distance = +lines[1].split(" ").filter(Number).join("");

  const [firstWinningHoldTime, lastWinningHoldTime] = determineWinningHoldTimes(
    time,
    distance,
  );

  return lastWinningHoldTime - firstWinningHoldTime + 1;
}
