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

app.use(express.json());

app.get("/mean", (req, res) => {
  const nums = parseNumString(req.query.nums as string);
  const mean = nums.reduce((sum, n) => sum + n) / nums.length;
  return res.json(formatResponse("mean", mean));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
