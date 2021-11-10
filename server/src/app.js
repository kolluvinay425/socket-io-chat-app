import express from "express";
import cors from "cors";

export const app = express();
const port = 3030;
app.use(cors());
app.use(express.json());

app.get("/chat/:room", async (req, res) => {});

export default app;
