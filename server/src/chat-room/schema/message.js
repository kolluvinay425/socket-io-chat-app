import mongoose from "mongoose";
import userModel from "../../users/schema.js";
const { model, Schema } = mongoose;

export const messageSchema = new Schema(
  {
    // roomId: {
    //   type: String,
    //   required: true,
    // },
    sender: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      default:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    },
    created: {
      type: String,
      default:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    },
  },
  { timestamps: false }
);

export default model("message", messageSchema);