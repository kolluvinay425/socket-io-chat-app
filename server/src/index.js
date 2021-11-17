import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
// import messageModel from "./chat-room/schema/message.js";
import list from "express-list-endpoints";
const port = process.env.PORT || 3001;
const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join_room", (roomId, username) => {
//     socket.join(roomId);

//     console.log(`userName with ${username} joined room:${roomId}`);
//   });
//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);

//     const chatHistory = new messageModel({
//       roomId: data.room,
//       sender: data.author,
//       message: data.message,
//     });
//     chatHistory.save();
//     console.log("message:", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });

import chatModel from "./chat-room/schema/chat.js";

import { isRoom, isUserInRoom } from "./socketIoUtils/index.js";

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("socket ID:", socket.id);

  // when user connect, check if user belong to any room, if yes user socket id to join room
  socket.on("isUser", async ({ userId }) => {
    const rooms = await isUserInRoom(userId);
    if (rooms.length !== 0) {
      rooms.forEach((element) => {
        socket.join(element.toString());
      });
      console.log(socket.rooms);
    } else [console.log("user not belong to any room")];
  });

  //create room, add new room to database
  socket.on("createRoom", async ({ roomName, userIds }) => {
    try {
      const newRoom = new chatModel({
        roomName,
        users: userIds.map((userId) => mongoose.Types.ObjectId(userId._id)),
      });
      const { _id } = await newRoom.save();

      socket.join(_id);
      io.emit("createdRoom", newRoom);
    } catch (error) {
      console.log(error);
    }
  });

  //send message, find room and update chatHistory
  socket.on("sendMessage", async ({ roomId, text, sender }) => {
    try {
      if (await isRoom(roomId)) {
        const test = await chatModel.findOneAndUpdate(
          { _id: roomId },
          {
            $push: { chatHistory: { text, sender } },
          },
          { new: true }
        );
        io.in(roomId).emit("messages", text);
      } else {
        console.log("The room not exist!");
      }
    } catch (error) {
      console.log(error);
      socket.emit("message-error", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected socket " + socket.id);
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
