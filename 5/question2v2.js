import input from "./input.js";
import { extractMap } from "./question1.js";

// compute seeds from location (starting at 0 and then up) and stop at the first seed that exist in the set of seeds.

export function computeAnswer() {
  console.time("working");
  let lowestLocation = undefined;
  const seeds = input
    .match(/^seeds: (.+)$/m)?.[1]
    .split(" ")
    .map(Number)
    .flatMap((num, i, mappedSeeds) =>
      (i + 1) % 2 === 0 ? [{ from: mappedSeeds[i - 1], range: num }] : [],
    );

  if (!seeds) throw "could not find seeds";
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

  const getSeedFromLocation = (location) => {
    let currentDestination = location;
    for (let i = maps.length - 1; i > -1; i--) {
      const map = maps[i];
      for (let j = 0; j < map.length; j++) {
        const currentMap = map[j];
        if (
          currentMap.destinationStart <= currentDestination &&
          currentMap.destinationStart + currentMap.range > currentDestination
        ) {
          currentDestination =
            currentMap.sourceStart +
            (currentDestination - currentMap.destinationStart);
          break;
        }
      }
    }
    const seedExist = seeds.find(
      (seedRange) =>
        seedRange.from <= currentDestination &&
        seedRange.range + seedRange.from > currentDestination,
    );
    return seedExist ? currentDestination : false;
  };

  for (let i = 0; i < Infinity; i++) {
    const seed = getSeedFromLocation(i);
    if (seed) {
      lowestLocation = i;
      break;
    }
    if (i % 10_000_000 === 0) {
      console.log("checked", i);
    }
  }

  console.log(lowestLocation);
  console.timeEnd("working");
  return lowestLocation;
}
