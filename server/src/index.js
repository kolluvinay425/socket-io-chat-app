import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3001;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket:", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`running on ${port}`);
});
