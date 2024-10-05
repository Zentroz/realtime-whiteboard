import React, { useEffect, useRef, useState, useContext } from 'react';
import ToolContext from '../context/toolContext';
import ShapeContext from '../context/ShapeContext';
import { socket } from '../socket';

const DrawingCanvas = () => {
  const canvas = useRef();
  const [context, setContext] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const { currentTool, tools } = useContext(ToolContext);
  const { drawShapes } = useContext(ShapeContext);

  useEffect(() => {
    setContext(canvas.current.getContext("2d"));
    socket.connect();
    socket.on("server-response", (res) => {
      console.log(res);
    })
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
    setIsDrawing(true);
    tools[currentTool].start(e, context);
  }
  const MouseMove = (e) => {
    if (!isDrawing) return;
    tools[currentTool].drawing(e, context);
    drawShapes(context);
  }
  const MouseUp = (e) => {
    setIsDrawing(false);
    tools[currentTool].end(e, context);
  }

  window.addEventListener("resize", () => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.heigth = window.innerHeight;
    drawShapes(context);
  })

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