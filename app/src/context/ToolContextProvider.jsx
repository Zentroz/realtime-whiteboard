import { useState, useContext } from "react";
import RectContext from "./RectContext";
import ToolContext from "./toolContext";
import LineContext from "./LineContext";
import CircleContext from "./CircleContext";
import ShapeContext from "./ShapeContext";

const ToolContextProvider = ({ children }) => {
  const { shapeList } = useContext(ShapeContext);
  const [currentTool, setCurrentTool] = useState("Pen");
  const { resizeRect, addRect } = useContext(RectContext);
  const { addLine, addPoint, drawLine } = useContext(LineContext);
  const { addCircle, changeRadius, drawCircle } = useContext(CircleContext);
  const [rectX, setRectX] = useState(0);
  const [rectY, setRectY] = useState(0);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);

  const penStart = (event, context) => {
    addLine(event.clientX, event.clientY);
  }
  const penDrawing = (event, context) => {
    addPoint(shapeList.length - 1, event.clientX, event.clientY);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  const penEnd = (event, context) => {
    context.closePath();
  }

  const circleStart = (event, context) => {
    setCircleX(event.clientX);
    setCircleY(event.clientY);
    addCircle(event.clientX, event.clientY, 0);
  }
  const circleDrawing = (event, context) => {
    const id = shapeList.length - 1;
    changeRadius(id, Math.sqrt(Math.pow(event.clientX - circleX, 2) + Math.pow(event.clientY - circleY, 2)));
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  const circleEnd = (event, context) => {
    context.closePath();
  }

  const rectStart = (event, context) => {
    setRectX(event.clientX);
    setRectY(event.clientY);
    addRect(event.clientX, event.clientY, 0, 0, 2, context);
  }
  const rectDrawing = (event, context) => {
    resizeRect(shapeList.length - 1, event.clientX - rectX, event.clientY - rectY, context);
  }

  const tools = {
    "Pen": {
      start: penStart,
      drawing: penDrawing,
      end: penEnd,
    },
    "Rectangle": {
      start: rectStart,
      drawing: rectDrawing,
      end: () => { },
    },
    "Circle": {
      start: circleStart,
      drawing: circleDrawing,
      end: circleEnd,
    },
    "Eraser": {
      start: () => { },
      drawing: () => { },
      end: () => { },
    },
  };

  return (
    <ToolContext.Provider value={{ tools, currentTool, setCurrentTool, penStart, penDrawing, penEnd, rectStart, rectDrawing }}>
      {children}
    </ToolContext.Provider>
  )
};

export default ToolContextProvider;