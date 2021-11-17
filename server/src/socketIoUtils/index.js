import chatModel from "../chat-room/schema/chat.js";

export const isRoom = async (roomId) => {
  try {
    const room = await chatModel.findById({ _id: roomId });
    if (room) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// check if user belong to any room
export const isUserInRoom = async (userId) => {
  try {
    const userExistInRoom = await chatModel.find({ users: userId });
    const rooms = userExistInRoom.map((room) => room._id);
    return rooms;
  } catch (error) {
    console.log(error);
  }
};
