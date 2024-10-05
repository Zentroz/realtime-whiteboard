import React from 'react';
import { useForm } from 'react-hook-form';
import { isInsideElement } from '../utils/utils';
import { socket } from '../socket';

const JoinRoom = ({ isVisible, setIsVisible }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const joinRoom = (data) => {
    if (data.name == "" && data.password == "") return;
    socket.emit("join-room", data);
  }

  window.addEventListener("mouseup", (e) => {
    const isInside = isInsideElement("room-join-form", e.clientX, e.clientY);
    if (!isInside) setIsVisible(false);
  })

  return (
    <div className={`room-join-form absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white ${isVisible ? "" : "hidden"} border-2 border-black rounded-md`}
    >
      <form className='create-room-form flex flex-col px-4 py-2 gap-3' onSubmit={handleSubmit(joinRoom)}>
        <input className='create-room-input px-2 focus:outline-none' type="text" placeholder='Room Name' {...register("name", { minLength: 4, maxLength: 20 })} />
        <input className='create-room-input px-2 focus:outline-none' type="password" placeholder='Room Password' {...register("password", { minLength: 2, maxLength: 30 })} />
        <button className='create-room-button border-2 border-black rounded-md'>Join</button>
      </form>
    </div>
  )
};

export default JoinRoom;