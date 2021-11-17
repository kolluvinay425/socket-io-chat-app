import mongoose from "mongoose";
import { messageSchema } from "./message";
import { userSchema } from "../../users/schema";
const { model, Schema } = mongoose;

const chatSchema = new Schema({
  members: {
    type: [userSchema],
    required: true,
    default: [],
  },
  history: {
    type: [messageSchema],
    required: true,
    default: [],
  },
});

export default model("chatting", chatSchema);
