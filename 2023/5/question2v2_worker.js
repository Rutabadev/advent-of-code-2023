import { parentPort } from "worker_threads";

let workerId = undefined;
let currentLocationToCheck = undefined;
let batchSize = 1_000_000;
let foundLocation = undefined;
let stoppedAtLocation = undefined;

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

function workUnit(data) {
  const { i, concurrentWorkers, maps, seeds } = data;
  let batchCount = batchSize;
  while (batchCount > 0) {
    if (currentLocationToCheck > stoppedAtLocation) {
      console.log("early returned");
      foundLocation = Infinity;
      parentPort?.postMessage(foundLocation);
      return;
    }
    let seedExist = getSeedFromLocation(currentLocationToCheck, maps, seeds);
    if (currentLocationToCheck % (4_000_000 * concurrentWorkers + i) === 0) {
      console.log(`checked ${currentLocationToCheck} by ${i}`);
    }
    if (!seedExist) {
      currentLocationToCheck += concurrentWorkers;
      batchCount--;
      continue;
    }
    parentPort?.postMessage(currentLocationToCheck);
    break;
  }
}

function work(data) {
  workUnit(data);
  setTimeout(() => work(data), 0);
}

parentPort?.on("message", ({ action, data }) => {
  if (action === "start") {
    currentLocationToCheck = data.i;
    workerId = data.i;
    work(data);
  }
  if (action === "stop") {
    console.log("stopping", workerId, "at", data);
    stoppedAtLocation = data;
  }
});
