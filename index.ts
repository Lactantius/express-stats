import express from "express";

const app = express();

function parseNumString(numString: string): number[] {
  return numString.split(",").map((num) => Number(num));
}

app.use(express.json());

app.get("/mean", (req, res) => {
  const nums = parseNumString(req.query.nums as string);
  console.log(nums);
  return res.json(nums);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
