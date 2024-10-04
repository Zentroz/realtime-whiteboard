import { useContext } from "react";
import LineContext from "./LineContext";
import ShapeContext from "./ShapeContext";

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
    shapeList[index].data.points.push({ x, y });
  }


  return (
    <LineContext.Provider value={{ shapeList, addLine, addPoint }}>
      {children}
    </LineContext.Provider>
  )
}

export default LineContextProvider;