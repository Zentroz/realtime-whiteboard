import React from 'react';

const Notification = () => {
  return (
    <>
      <span className='notification flex transition-[right] px-2 duration-75 py-5 border-2 border-black rounded-md absolute bottom-2 -right-64'>
        <img className='w-6 h-6' src="/static/notificationIcon.png" alt="notification-icon" />
        <p id='notification-content'></p>
      </span></>
  )
};

export default Notification;