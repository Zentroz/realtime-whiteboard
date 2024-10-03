import { useState } from "react";
import ToolContext from "./toolContext";

const ToolContextProvider = ({ children }) => {
  const [currentTool, setCurrentTool] = useState("Pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const tools = {
    "Pen": {},
    "Rectangle": {},
    "Circle": {},
    "Eraser": {},
  };

  const penStart = (event, context) => {
    setIsDrawing(true);
    setLastX(event.clientX);
    setLastY(event.clientY);

    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
  }
  const penDrawing = (event, context) => {
    if (!isDrawing) return;
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
  }
  const penEnd = (event, context) => {
    context.closePath();
    setIsDrawing(false);
  }

  return (
    <ToolContext.Provider value={{ tools, currentTool, setCurrentTool, penStart, penDrawing, penEnd }}>
      {children}
    </ToolContext.Provider>
  )
};

export default ToolContextProvider;