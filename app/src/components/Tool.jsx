import React from 'react';

const Tool = ({ name, currentTool, setTool }) => {
  const icon = `src/assets/${name.toLowerCase()}Icon.png`
  return (
    <div
      className={`tool w-8 h-8 ${currentTool == name ? "bg-slate-200" : ""} hover:bg-slate-300 hover:bg-opacity-30 p-1 rounded-md`}
      onClick={() => setTool(name)}
    >
      <img className='w-full' src={icon} alt={name} />
    </div>
  )
};

export default Tool;