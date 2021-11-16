import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import Chat from "./components/Chat";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room, username);
    }
  };
  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="container">
        <div className="row">
          <></>
          <div className="col-md-4">
            <div className="row">
              <FormControl
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="enter ur name"
              ></FormControl>
              <FormControl
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
                placeholder="room id..."
              ></FormControl>
              <Button onClick={joinRoom}>join room</Button>
            </div>
          </div>
          <div className="col-md-8">
            <Chat socket={socket} username={username} room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
