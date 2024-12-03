import input from "./input.js";

export function computeAnswer() {
  const games = input.split("\n").reduce((acc, game) => {
    const id = game.match(/^Game (\d+)/)?.[1] ?? "miss";
    const data = game.match(/^Game \d+: (.+)/)?.[1];
    return {
      ...acc,
      [id]: data,
    };
  }, {});

  const result = Object.values(games).reduce((acc, game) => {
    const reveals = game.split(";").map((x) => x.trim());
    const maxes = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let reveal of reveals) {
      for (let color of ["red", "green", "blue"]) {
        const revealed = +reveal.match(new RegExp(`(\\d+) ${color}`))?.[1] ?? 0;
        if (maxes[color] < revealed) {
          maxes[color] = revealed;
        }
      }
    }
    const power = Object.values(maxes).reduce((acc, x) => acc * x);
    return acc + power;
  }, 0);
  console.log(result);
  return result;
}
