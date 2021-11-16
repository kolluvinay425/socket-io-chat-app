import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import chatModel from "./chat-room/schema.js";
import list from "express-list-endpoints";
const port = process.env.PORT || 3001;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (roomId, username) => {
    socket.join(roomId);

    console.log(`userName with ${username} joined room:${roomId}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);

    const chatHistory = new chatModel({
      roomId: data.room,
      username: data.author,
      message: data.message,
      time: data.time,
    });
    chatHistory.save();
    console.log("message:", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("database connected");
  server.listen(port, () => {
    console.table(list(app));
    console.log(`running on ${port}`);
  });
});
