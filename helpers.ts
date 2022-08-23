function parseNumString(numString: string): number[] {
  if (!numString) {
    throw new ExpressError(
      "Query string with format 'nums=n1,n2' required",
      400
    );
  }
  const parsed = numString.split(",").reduce((nums, num) => {
    const toN = Number(num);
    if (toN) {
      return nums.concat(toN);
    } else {
      return nums.concat(num);
    }
  }, new Array());
  const invalid = parsed.filter((elem) => typeof elem === "string");
  if (invalid.length > 0) {
    throw new ExpressError(
      `Query string contains invalid elements: ${invalid}`,
      400
    );
  }
  return parsed;
}

interface ResponseJSON {
  response: {
    operation: string;
    value: number;
  };
}

function formatResponse(operation: string, value: number): ResponseJSON {
  return { response: { operation: operation, value: value } };
}

interface Frequency {
  [n: number]: number;
}

function getMean(nums: number[]): number {
  return nums.reduce((sum, n) => sum + n) / nums.length;
}

/*
 * There is probably a better way to do this
 */
function getMode(nums: number[]): number {
  const frequency = nums.reduce((obj, n) => {
    obj[n] ? (obj[n] = obj[n] + 1) : (obj[n] = 1);
    return obj;
  }, <Frequency>{});
  return Number(
    Object.entries(frequency).reduce(
      (highest, next) => (next[1] > highest[1] ? next : highest),
      [0, 0]
    )[0]
  );
}

function getMedian(nums: number[]): number {
  const sorted = nums.slice().sort();
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[midpoint];
  } else {
    return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  }
}

class ExpressError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
    // console.error(this.stack); // Cannot test with this uncommented
  }
}

export {
  parseNumString,
  formatResponse,
  getMean,
  getMode,
  getMedian,
  ExpressError,
};
