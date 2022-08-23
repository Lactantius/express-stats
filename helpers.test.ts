const {
  parseNumString,
  formatResponse,
  getMode,
  getMedian,
  ExpressError,
} = require("./helpers");

describe("parseNumString", () => {
  test("returns array of numbers", () => {
    const numArray = parseNumString("1,0.2,-4.05");
    expect(numArray).toEqual([1, 0.2, -4.05]);
  });
});
