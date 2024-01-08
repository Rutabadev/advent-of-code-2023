import { describe, test, expect } from "vitest";
import * as day1 from "./1";
import * as day2 from "./2";
import * as day3 from "./3";
import * as day4 from "./4";
import * as day5 from "./5";
import * as day6 from "./6";
import * as day7 from "./7";

describe("day 1", () => {
  test("question 1", () => {
    expect(day1.question1()).toEqual(54_081);
  });
  test("question 2", () => {
    expect(day1.question2()).toEqual(54_649);
  });
});

describe("day 2", () => {
  test("question 1", () => {
    expect(day2.question1()).toEqual(2_716);
  });
  test("question 2", () => {
    expect(day2.question2()).toEqual(72_227);
  });
});

describe("day 3", () => {
  test("question 1", () => {
    expect(day3.question1()).toEqual(550_064);
  });
  test("question 2", () => {
    expect(day3.question2()).toEqual(85_010_461);
  });
});

describe("day 4", () => {
  test("question 1", () => {
    expect(day4.question1()).toEqual(28_750);
  });
  test.skip("question 2 (caching) ~1s", () => {
    expect(day4.question2()).toEqual(10_212_704);
  });
  test("question 2 v2 (optimized algorithm)", () => {
    expect(day4.question2v2()).toEqual(10_212_704);
  });
});

describe("day 5", () => {
  test("question 1", () => {
    expect(day5.question1()).toEqual(196_167_384);
  });
  test.skip("question 2 2m47s", () => {
    expect(day5.question2()).toEqual(125_742_456);
  });
  test("question 2 v2 (optimized algorithm + worker threads) ~3s", async () => {
    expect(await day5.question2v2()).toEqual(125_742_456);
  });
});

describe("day 6", () => {
  test("question 1", () => {
    expect(day6.question1()).toEqual(160_816);
  });
  test.skip("question 2 ~7s", () => {
    expect(day6.question2()).toEqual(46_561_107);
  });
  test("question 2 v2", () => {
    expect(day6.question2v2()).toEqual(46_561_107);
  });
});

describe("day 7", () => {
  test("question 1", () => {
    expect(day7.question1()).toEqual(248_453_531);
  });
});
