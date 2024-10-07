import RoomContext from "./RoomContext";
import { socket } from "../socket";
import { useState } from "react";
import { popNotification } from "../utils/utils";

const RoomContextProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");

  socket.on("room-created", (res) => {
    setRoomId(res.roomId);
    popNotification("Room Created");
  })

  socket.on("room-joined", (res) => {
    setRoomId(res.roomId);
    popNotification("Room Joined");
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