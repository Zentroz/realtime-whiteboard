import React, { useState, useContext } from 'react';
import ToolContext from '../context/toolContext';
import Tool from './Tool';

const ToolsBox = () => {

  const { tools, currentTool, setCurrentTool } = useContext(ToolContext);
  return (
    <span className='tool-box absolute top-[20vh] left-2 w-12 px-1 py-2 flex flex-col items-center gap-3 border-2 border-black rounded-md select-none'>
      {Object.entries(tools).map((tool, i) =>
        <Tool key={i} name={tool[0]} setTool={setCurrentTool} currentTool={currentTool} />
      )
      }
    </span>
  )
};

export default ToolsBox;