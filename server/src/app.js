import express from "express";
import cors from "cors";
import userRouter from "./users/index.js";
import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./errorHandlers.js";

export const app = express();
app.use(cors());
app.use(express.json());

// app.get("/chat/:room", async (req, res) => {});

//************************middlewares**********************
app.use(unauthorizedHandler);
app.use(forbiddenHandler);
app.use(catchAllHandler);

//************************Routes**********************
app.use("/user", userRouter);
export default app;
