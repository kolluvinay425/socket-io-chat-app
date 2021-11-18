import React, { useEffect, useState } from "react";
import { FormControl, Button } from "react-bootstrap";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
  }, []);
  return (
    <>
      <div>
        <FormControl
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          placeholder="enter message"
        ></FormControl>
        <Button onClick={sendMessage}>submit</Button>
      </div>
      <div>
        {messageList?.map((msg) => {
          return <h1>{msg.message}</h1>;
        })}
      </div>
    </>
  );
}

export default Chat;
