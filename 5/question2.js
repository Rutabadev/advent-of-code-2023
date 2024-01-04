import input from "./input.js";
import { extractMap } from "./question1.js";

export function computeAnswer() {
  console.time("working");
  let lowestLocation = Infinity;
  const seeds = input
    .match(/^seeds: (.+)$/m)?.[1]
    .split(" ")
    .map(Number)
    .flatMap((num, i, mappedSeeds) =>
      (i + 1) % 2 === 0 ? [{ from: mappedSeeds[i - 1], range: num }] : [],
    );

  if (!seeds) throw "could not find seeds";
  const totalSeeds = seeds.reduce((acc, curr) => {
    acc += curr.range;
    return acc;
  }, 0);
  const steps = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
  ];
  const maps = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const map = extractMap(`${steps[i]}-to-${steps[i + 1]}`);
    if (!map) throw "could not extract map";
    maps.push(map);
  }

  const getLocationFromSeed = (seed) => {
    let currentSource = seed;
    for (let i = 0; i < maps.length; i++) {
      const map = maps[i];
      for (let j = 0; j < map.length; j++) {
        const currentMap = map[j];
        if (
          currentMap.sourceStart <= currentSource &&
          currentMap.sourceStart + currentMap.range > currentSource
        ) {
          currentSource =
            currentMap.destinationStart +
            (currentSource - currentMap.sourceStart);
          break;
        }
      }
    }
    return currentSource;
  };

  let seedsChecked = 0;
  for (let i = 0; i < seeds.length; i++) {
    console.log("seed range", i + 1, "sur", seeds.length);
    let { from, range } = seeds[i];
    for (let j = 0; j < range; j++) {
      const seed = from + j;
      const location = getLocationFromSeed(seed);
      if (location < lowestLocation) {
        lowestLocation = location;
      }
      seedsChecked++;
      if (seedsChecked % 7_000_000 === 0) {
        console.log(`${((seedsChecked / totalSeeds) * 100).toFixed(2)}%`);
      }
    }
  }

  console.log(lowestLocation);
  console.timeEnd("working");
  return lowestLocation;
}
