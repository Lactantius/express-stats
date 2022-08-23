import express, { NextFunction } from "express";
import {
  parseNumString,
  formatResponse,
  getMode,
  getMedian,
  ExpressError,
} from "./helpers";

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

app.use((req, res, next) => {
  const notFoundError = new ExpressError("Page Not Found", 404);
  return next(notFoundError);
});

app.use((err: ExpressError, req: any, res: any, next: NextFunction) => {
  /* Not sure why it's not pulling the types of res and req */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({ error: { message, status } });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
