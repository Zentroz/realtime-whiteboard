import React, { useContext, useState } from 'react';
import { socket } from '../socket';
import RoomContext from '../context/RoomContext';

const Menu = ({ isVisible, setIsVisible, setRoomVisible, setJoinRoomVisible }) => {
  const [canCreateRoom, setCanCreateRoom] = useState();
  const [canJoinRoom, setCanJoinRoom] = useState();
  const { roomId } = useContext(RoomContext);

  const leaveRoom = () => {
    console.log(roomId);
    socket.emit("leave-room", roomId);
  }

  const menu = {
    "Create Room": () => { setRoomVisible(true); setIsVisible(false) },
    "Join Room": () => { setJoinRoomVisible(true); setIsVisible(false) },
    "Leave Room": leaveRoom,
  }

  return (
    <span className={`menu-option-container ${isVisible ? "" : "hidden"} absolute top-2 right-12 bg-white z-50 p-1 border-2 border-black rounded-md`}>
      {Object.entries(menu).map((option, i) =>
        <div key={i} className='menu-option px-1 rounded-md cursor-pointer w-48 h-6 hover:bg-zinc-500 hover:bg-opacity-20' onClick={option[1]}>{option[0]}</div>
      )}
    </span>
  )
};

export default Menu;