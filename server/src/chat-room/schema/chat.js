import mongoose from "mongoose";
import { messageSchema } from "./message.js";
// import { userSchema } from "../../users/schema";
const { model, Schema } = mongoose;

const chatSchema = new Schema({
  roomName: { type: String, required: true },

  users: [{ type: mongoose.ObjectId, ref: "user", required: true }],

  history: {
    type: [messageSchema],
    required: true,
    default: [],
  },
});

export default model("chatting", chatSchema);
