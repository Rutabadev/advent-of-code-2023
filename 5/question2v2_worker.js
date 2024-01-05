import { parentPort } from "worker_threads";

const getSeedFromLocation = (location, maps, seeds) => {
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

parentPort?.on("message", ({ i, concurrentWorkers, maps, seeds }) => {
  for (let j = i; j < 1_000_000_000; j += concurrentWorkers) {
    let seedExist = getSeedFromLocation(j, maps, seeds);
    if (j % (4_000_000 * concurrentWorkers + i) === 0) {
      parentPort?.postMessage({
        action: "log",
        data: `checked ${j} by ${i}`,
      });
    }
    if (!seedExist) {
      continue;
    }
    parentPort?.postMessage({ action: "done", data: j });
    break;
  }
});
