import input from "./input.js";
import { extractMap } from "./question1.js";
import { Worker } from "worker_threads";
import { cpus } from "os";

// compute seeds from location (starting at 0 and then up) and stop at the first seed that exist in the set of seeds.

export function computeAnswer() {
  return new Promise((resolve) => {
    const start = performance.now();
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

    const concurrentWorkers = cpus().length;
    const results = [];
    let runningWorkersCount = concurrentWorkers;
    const runningWorkers = [];
    for (let i = 0; i < concurrentWorkers; i++) {
      const worker = new Worker("./5/question2v2_worker.js");
      runningWorkers.push(worker);
      worker.postMessage({
        i,
        concurrentWorkers,
        maps,
        seeds,
      });
      worker.on("message", ({ action, data }) => {
        if (action === "done") {
          console.log("worker", i, "found", data);
          results.push(data);
          worker.terminate();
          runningWorkersCount--;
          if (!runningWorkersCount) {
            const end = performance.now();
            console.log("took", ((end - start) / 1000).toPrecision(3), "s");
            resolve(results.sort((a, b) => a - b)[0]);
          }
        }
        if (action === "log") {
          console.log(data);
        }
      });
    }
  });
}
