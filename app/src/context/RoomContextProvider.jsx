import RoomContext from "./RoomContext";
import { socket } from "../socket";
import { useState } from "react";

const RoomContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("asdasdsa");

  socket.on("room-created", (res) => {
    setRoomId(res.roomId);
  })

  socket.on("room-joined", (res) => {
    setRoomId(res.roomId);
  })

  socket.on("room-left", () => {
    setRoomId("");
    console.log("Room Left!");
  })

  return (
    <RoomContext.Provider value={{ roomId }}>
      {children}
    </RoomContext.Provider>
  )
};

export default RoomContextProvider;