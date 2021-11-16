import mongoose from "mongoose";

const { model, Schema } = mongoose;

const chatSchema = new Schema({
  members: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  history: {
    type: mongoose.Types.ObjectId,
    ref: "message",
  },
});

export default model("chatting", chatSchema);
