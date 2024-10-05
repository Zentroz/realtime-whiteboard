import React, { useState } from 'react';
import Menu from './Menu';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const MenuButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [roomVisible, setRoomVisible] = useState(false);
  const [joinRoomVisible, setJoinRoomVisible] = useState(false);
  return (
    <>
      <Menu isVisible={menuVisible} setIsVisible={setMenuVisible} setRoomVisible={setRoomVisible} setJoinRoomVisible={setJoinRoomVisible} />
      <button className='menu-button absolute top-2 right-2 w-8 h-8 border-2 border-black rounded-md hover:bg-slate-400 hover:p-[0.1rem] transition-[padding] duration-500 hover:bg-opacity-20 shadow-md p-1' onClick={() => setMenuVisible(prevValue => !prevValue)}>
        <img className='menu-image w-full h-full' src="src/assets/menuIcon.png" alt="menu-icon" />
      </button>
      <CreateRoom isVisible={roomVisible} setIsVisible={setRoomVisible} />
      <JoinRoom isVisible={joinRoomVisible} setIsVisible={setJoinRoomVisible} />
    </>
  )
};

export default MenuButton;