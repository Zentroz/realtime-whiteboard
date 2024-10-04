import { useContext } from "react";
import CircleContext from "./CircleContext";
import ShapeContext from "./ShapeContext";

const CircleContextProvider = ({ children }) => {
  const { shapeList } = useContext(ShapeContext);

  const addCircle = (x, y, radius) => {
    const id = shapeList.length == 0 ? 0 : shapeList.length;
    shapeList.push(
      {
        id,
        type: "circle",
        data: {
          x,
          y,
          radius,
          strokeWidth: 2
        }
      }
    );
  }

  const changeRadius = (id, radius) => {
    const index = shapeList.findIndex((circle) => circle.id == id);
    shapeList[index].data.radius = radius;
  }

  return (
    <CircleContext.Provider value={{ shapeList, addCircle, changeRadius }}>
      {children}
    </CircleContext.Provider>
  )
}

export default CircleContextProvider;