import express from "express";
import { parseNumString, formatResponse, getMode, getMedian } from "./helpers";

const app = express();

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

app.get("/median", (req, res) => {
  const nums = parseNumString(req.query.nums as string);
  const median = getMedian(nums);
  return res.json(formatResponse("median", median));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
