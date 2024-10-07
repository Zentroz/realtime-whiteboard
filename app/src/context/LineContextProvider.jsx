import { useContext, useEffect } from "react";
import LineContext from "./LineContext";
import ShapeContext from "./ShapeContext";
import { socket } from "../socket";

const LineContextProvider = ({ children }) => {
  const { shapeList } = useContext(ShapeContext);

  const addLine = (x, y) => {
    const id = shapeList.length == 0 ? 0 : shapeList.length;
    shapeList.push(
      {
        id,
        type: "line",
        data: {
          points: [{ x, y }],
          strokeWidth: 2
        }
      }
    )
  }

  const addPoint = (id, x, y) => {
    const index = shapeList.findIndex((line) => line.id == id);
    const lastPoint = shapeList[index].data.points[shapeList[index].data.points.length - 1];
    const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
    if (distance < 10) return;
    shapeList[index].data.points.push({ x, y });
  }

  // useEffect(() => {
  //   socket.on("start-line", (data) => {
  //     // console.log(data);
  //     // addLine(data.x, data.y);
  //   })
  //   socket.on("draw-line", (data) => {
  //     // addPoint(shapeList.length - 1, data.x, data.y);
  //     console.log("Drawing Line:", data);
  //   })
  //   socket.on("end-line", (data) => {
  //     console.log(data);
  //   })
  // }, [])


  return (
    <LineContext.Provider value={{ shapeList, addLine, addPoint }}>
      {children}
    </LineContext.Provider>
  )
}

export default LineContextProvider;