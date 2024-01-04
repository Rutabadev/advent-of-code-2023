import input from "./input.js";

export const extractMap = (mapName) => {
  const mapRegex = new RegExp(`${mapName} map:\n(.+?)(\n\n|$)`, "s");
  return input
    .match(mapRegex)?.[1]
    .split("\n")
    .map((stringMap) => {
      const [destinationStart, sourceStart, range] = stringMap
        .split(" ")
        .map(Number);
      return { destinationStart, sourceStart, range };
    });
};

export function computeAnswer() {
  const seeds = input
    .match(/^seeds: (.+)$/m)?.[1]
    .split(" ")
    .map(Number);
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
  const locations = maps.reduce((sourceList, map, i) => {
    const nextSourceList = sourceList.map((source) => {
      const correspondingMap = map.find(
        (map) =>
          map.sourceStart <= source && map.sourceStart + map.range >= source,
      );
      if (!correspondingMap) return source;
      return (
        correspondingMap.destinationStart +
        (source - correspondingMap.sourceStart)
      );
    });
    return nextSourceList;
  }, seeds);
  const result = locations.sort((a, b) => a - b)[0];
  console.log(result);
  return result;
}
