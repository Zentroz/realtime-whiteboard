import React, { useEffect, useRef, useState, useContext } from 'react';
import ToolContext from '../context/toolContext';
import rough from 'roughjs';

const DrawingCanvas = () => {
  const canvas = useRef();
  const [context, setContext] = useState();
  const { currentTool, penStart, penEnd, penDrawing } = useContext(ToolContext);

  useEffect(() => {
    setContext(canvas.current.getContext("2d"));
  }, [])

  useEffect(() => {
    if (context == undefined) return;
    if (currentTool == "Eraser") {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
  }, [currentTool])

  const MouseDown = (e) => {
    switch (currentTool) {
      case "Pen":
        penStart(e, context);
        break;
      case "Eraser":
        penStart(e, context);
        context.lineWidth = 50;
        break;
    }
  }
  const MouseMove = (e) => {
    switch (currentTool) {
      case "Pen":
        penDrawing(e, context);
        break;
      case "Eraser":
        penDrawing(e, context);
        break;
    }
  }
  const MouseUp = (e) => {
    switch (currentTool) {
      case "Pen":
        penEnd(e, context);
        break;
      case "Eraser":
        penEnd(e, context);
        break;
    }
  }

  return (
    <>
      <canvas
        className='canvas overflow-hidden cursor-crosshair'
        id='canvas'
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={MouseDown}
        onMouseMove={MouseMove}
        onMouseUp={MouseUp}
        ref={canvas}
      ></canvas>
    </>
  )
};

export default DrawingCanvas;