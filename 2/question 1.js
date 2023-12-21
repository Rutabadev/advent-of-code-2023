import input from './input.js';

let result = 0;

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = input
  .split('\n')
  .reduce((acc, game) => {
    const id = game.match(/^Game (\d+)/)?.[1] ?? 'miss';
    const data = game.match(/^Game \d+: (.+)/)?.[1];
    return {
      ...acc,
      [id]: data,
    };
  }, {});

outerLoop: for (let i of Object.keys(games)) {
  const game = games[i];
  const reveals = game.split(";").map((x) => x.trim());
  // count cubes in each reveals
  for (let reveal of reveals) {
    for (let color of ['red', 'green', 'blue']) {
      const revealed = parseInt(reveal.match(new RegExp(`(\\d+) ${color}`))?.[1] ?? 0);
      if (revealed > cubes[color]) {
        continue outerLoop;
      }
    };
  }
  result += parseInt(i);
}

console.log(result);