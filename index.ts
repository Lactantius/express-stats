import express from "express";

const app = express();

function parseNumString(numString: string): number[] {
  return numString.split(",").map((num) => Number(num));
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

/*
 * There is probably a better way to do this
 */
function getMode(nums: number[]): number {
  const frequency = nums.reduce((obj, n) => {
    obj[n] ? (obj[n] = obj[n] + 1) : (obj[n] = 1);
    return obj;
  }, <Frequency>{});
  return Object.entries(frequency).reduce(
    (highest, next) => (next[1] > highest[1] ? next : highest),
    [0, 0]
  )[0];
}

app.use(express.json());

app.get("/mean", (req, res) => {
  const nums = parseNumString(req.query.nums as string);
  const mean = nums.reduce((sum, n) => sum + n) / nums.length;
  return res.json(formatResponse("mean", mean));
});

app.get("/mode", (req, res) => {
  const nums = parseNumString(req.query.nums as string);
  const mode = getMode(nums);
  return res.json(formatResponse("mode", mode));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
