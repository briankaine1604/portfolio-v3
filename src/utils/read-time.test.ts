// src/utils/calculateReadTime.test.ts
import { calculateReadTime } from "./read-time";

describe("calculateReadTime", () => {
  it("returns 1 for short content", () => {
    const result = calculateReadTime("Hello world!");
    expect(result).toBe(1);
  });

  it("calculates correct read time for ~400 words", () => {
    const words = "word ".repeat(400);
    const result = calculateReadTime(words);
    expect(result).toBe(2); // 400 / 200 = 2 minutes
  });

  it("ignores extra whitespace and newlines", () => {
    const content = "   Hello   world   \n\n this   is   spaced   ";
    const result = calculateReadTime(content);
    expect(result).toBe(1);
  });
});
