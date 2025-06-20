import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import userRouter from "./routes/user";
import { auth } from "./middlewares/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use(auth);
app.use("/user", userRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.type === "validation") {
    res.status(400).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
