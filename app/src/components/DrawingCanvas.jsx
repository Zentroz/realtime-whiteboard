import React, { useEffect, useRef, useState, useContext } from 'react';
import ToolContext from '../context/toolContext';
import ShapeContext from '../context/ShapeContext';
import { socket } from '../socket';
import Notification from './Notification';
import { popNotification } from '../utils/utils';
import RoomContext from '../context/RoomContext';

const DrawingCanvas = () => {
  const canvas = useRef();
  const [context, setContext] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMemberDrawing, setIsMemberDrawing] = useState(false);
  const { currentTool, tools } = useContext(ToolContext);
  const { drawShapes } = useContext(ShapeContext);
  const { roomId } = useContext(RoomContext);

  useEffect(() => {
    setContext(canvas.current.getContext("2d"));
    socket.connect();
    socket.on("error-response", (res) => {
      popNotification(res.message);
    })
    socket.on("start-shape", (data) => {
      // console.log(data);
      tools[data.tool].start(data.x, data.y, context);
      setIsMemberDrawing(true);
    })
    socket.on("draw-shape", (data) => {
      const innerContext = document.getElementById("canvas").getContext("2d");
      // addPoint(shapeList.length - 1, data.x, data.y);
      tools[data.tool].drawing(data.x, data.y, context);
      drawShapes(innerContext);
    })
    socket.on("end-shape", (data) => {
      setIsMemberDrawing(false);
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
    // if (roomId != "" || roomId.length != 0) 
    socket.emit("start-shape", {
      roomId,
      x: e.clientX,
      y: e.clientY,
      tool: currentTool
    })
    tools[currentTool].start(e.clientX, e.clientY, context);
  }
  const MouseMove = (e) => {
    if (!isDrawing) return;
    tools[currentTool].drawing(e.clientX, e.clientY, context);
    drawShapes(context);
    socket.emit("draw-shape", {
      roomId,
      x: e.clientX,
      y: e.clientY,
      tool: currentTool
    })
  }
  const MouseUp = (e) => {
    setIsDrawing(false);
    tools[currentTool].end(e.clientX, e.clientY, context);
    socket.emit("end-shape", {
      roomId,
      tool: currentTool
    })
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
      <Notification />
    </>
  )
};

export default DrawingCanvas;