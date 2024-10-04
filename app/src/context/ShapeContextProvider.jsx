import ShapeContext from "./ShapeContext";

const ShapeContextProvider = ({ children }) => {
  let shapeList = [];

  const drawLine = (context, line) => {
    context.beginPath();
    context.lineWidth = line.data.strokeWidth;
    context.moveTo(line.data.points[0].x, line.data.points[0].y);
    context.lineTo(line.data.points[0].x, line.data.points[0].y);
    line.data.points.forEach((point, i) => {
      context.lineTo(point.x, point.y);
      context.stroke();
    });
    context.closePath();
  }

  const drawRect = (ctx, rect) => {
    ctx.beginPath();
    ctx.lineWidth = rect.data.strokeWidth;
    ctx.rect(rect.data.x, rect.data.y, rect.data.width, rect.data.height);
    ctx.stroke();
    ctx.closePath();
  }

  const drawCircle = (context, circle) => {
    if (!context) return;
    context.beginPath();
    context.lineWidth = circle.data.strokeWidth;
    context.arc(circle.data.x, circle.data.y, circle.data.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  const drawShapes = (context) => {
    shapeList.forEach(shape => {
      if (shape.type == "line") drawLine(context, shape);
      if (shape.type == "rectangle") drawRect(context, shape);
      if (shape.type == "circle") drawCircle(context, shape);
      // if (shape.type == "line") drawLine(context, shape);
    });
  }
  return (
    <ShapeContext.Provider value={{ shapeList, drawShapes }}>
      {children}
    </ShapeContext.Provider>
  )
};

export default ShapeContextProvider;