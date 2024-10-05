import RectContext from "./RectContext";
import { useContext } from "react";
import ShapeContext from "./ShapeContext";

const RectContextProvider = ({ children }) => {
  let { shapeList } = useContext(ShapeContext);

  const addRect = (x, y, width, height, strokeWidth, context) => {
    const id = shapeList[shapeList.length - 1]?.id + 1 || 0;
    shapeList.push(
      {
        id,
        type: "rectangle",
        data: {
          x,
          y,
          width,
          height,
          strokeWidth
        }
      }
    );
  }

  const moveRect = (id, newPosition, ctx) => {
    const rect = shapeList.find((rect) => rect.id == id);
    ctx.clearRect(rect.data.x - (2 + rect.data.strokeWidth * 2),
      rect.data.y - (2 + rect.data.strokeWidth * 2),
      rect.data.width + (5 + rect.data.strokeWidth * 4),
      rect.data.height + (5 + rect.data.strokeWidth * 4)
    )
    shapeList = shapeList.filter((rect) => rect.id != id);
    shapeList.push({
      id: rect.id,
      type: "rectangle",
      data: {
        x: newPosition.x,
        y: newPosition.y,
        width: rect.data.width,
        height: rect.data.height,
        strokeWidth: rect.data.strokeWidth
      }
    })
  }

  const resizeRect = (id, width, height, ctx) => {
    if (shapeList.length == 0) return;
    const index = shapeList.findIndex((rect) => rect.id == id);
    shapeList[index].data.width = width;
    shapeList[index].data.height = height;
    ctx.clearRect(0,
      0,
      window.innerWidth,
      window.innerHeight
    )
  }

  return (
    <RectContext.Provider value={{ shapeList, addRect, moveRect, resizeRect }}>
      {children}
    </RectContext.Provider>
  )
}

export default RectContextProvider;