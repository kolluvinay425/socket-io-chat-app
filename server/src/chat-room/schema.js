import mongoose from "mongoose";
const { model, Schema } = mongoose;

const chatSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

export default model("Chat", chatSchema);
