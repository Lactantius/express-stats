const {
  parseNumString,
  formatResponse,
  getMean,
  getMode,
  getMedian,
  ExpressError,
} = require("./helpers");

describe("parseNumString", () => {
  test("returns array of numbers", () => {
    const numArray = parseNumString("1,0.2,-4.05");
    expect(numArray).toEqual([1, 0.2, -4.05]);
  });

  test("throws error if substring cannot be a number", () => {
    expect(() => parseNumString("1,invalid,2")).toThrowError(ExpressError);
  });

  test("throws error if no query string", () => {
    expect(() => parseNumString()).toThrowError(ExpressError);
  });
});

describe("getMean", () => {
  test("returns mean", () => {
    expect(getMean([-2.2, 1000, 0])).toBeGreaterThanOrEqual(332.59);
    expect(getMean([-2.2, 1000, 0])).toBeLessThanOrEqual(332.6); // Fix this sometime
  });
});

describe("getMode", () => {
  test("returns mode", () => {
    expect(getMode([1, 2, 2])).toEqual(2);
  });
});

describe("getMedian", () => {
  test("returns median of odd array", () => {
    expect(getMedian([-9, 3, 2])).toEqual(2);
  });
  test("returns median of even array", () => {
    expect(getMedian([-9, 3, 2.8, 5])).toEqual(2.9);
  });
});

describe("formatResponse", () => {
  test("returns object in proper shape", () => {
    expect(formatResponse("mean", -2.6)).toEqual({
      response: { operation: "mean", value: -2.6 },
    });
  });
});
