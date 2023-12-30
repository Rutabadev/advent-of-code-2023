import { describe, test, expect } from "vitest";
import { computeAnswer as day1Question1 } from "./1/question 1.js";
import { computeAnswer as day1Question2 } from "./1/question 2.js";
import { computeAnswer as day2Question1 } from "./2/question 1.js";
import { computeAnswer as day2Question2 } from "./2/question 2.js";
import { computeAnswer as day3Question1 } from "./3/question 1.js";
import { computeAnswer as day3Question2 } from "./3/question 2.js";
import { computeAnswer as day4Question1 } from "./4/question 1.js";
import { computeAnswer as day4Question2 } from "./4/question 2.js";

describe("day 1", () => {
  test("question 1", () => {
    expect(day1Question1()).toEqual(54081);
  });
  test("question 2", () => {
    expect(day1Question2()).toEqual(54649);
  });
});

describe("day 2", () => {
  test("question 1", () => {
    expect(day2Question1()).toEqual(2716);
  });
  test("question 2", () => {
    expect(day2Question2()).toEqual(72227);
  });
});

describe("day 3", () => {
  test("question 1", () => {
    expect(day3Question1()).toEqual(550064);
  });
  test("question 2", () => {
    expect(day3Question2()).toEqual(85010461);
  });
});

describe("day 4", () => {
  test("question 1", () => {
    expect(day4Question1()).toEqual(28750);
  });
  test("question 2", () => {
    expect(day4Question2()).toEqual(10_212_704);
  });
});
