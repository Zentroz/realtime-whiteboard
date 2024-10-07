import { useState, useContext } from "react";
import RectContext from "./RectContext";
import ToolContext from "./toolContext";
import LineContext from "./LineContext";
import CircleContext from "./CircleContext";
import ShapeContext from "./ShapeContext";

const ToolContextProvider = ({ children }) => {
  const { shapeList, drawLine } = useContext(ShapeContext);
  const [currentTool, setCurrentTool] = useState("Pen");
  const { resizeRect, addRect } = useContext(RectContext);
  const { addLine, addPoint } = useContext(LineContext);
  const { addCircle, changeRadius } = useContext(CircleContext);
  let rectX = 0;
  let rectY = 0;
  let circleX = 0;
  let circleY = 0

  const penStart = (x, y, context) => {
    addLine(x, y);
  }
  const penDrawing = (x, y, context) => {
    addPoint(shapeList.length - 1, x, y);
    // context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  const penEnd = (x, y, context) => {
    context.closePath();
  }

  const circleStart = (x, y, context) => {
    circleX = x;
    circleY = y;
    addCircle(x, y, 0);
  }
  const circleDrawing = (x, y, context) => {
    const innerContext = document.getElementById("canvas").getContext("2d");
    const id = shapeList.length - 1;
    changeRadius(id, Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)));
    innerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  const circleEnd = (x, y, context) => {
    context.closePath();
  }

  const rectStart = (x, y, context) => {
    rectX = x;
    rectY = y;
    addRect(x, y, 0, 0, 2, context);
  }
  const rectDrawing = (x, y, context) => {
    resizeRect(shapeList.length - 1, x - rectX, y - rectY, context);
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