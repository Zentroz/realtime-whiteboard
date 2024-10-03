import { useEffect } from 'react';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';
import ToolsBox from './components/ToolsBox';
import ToolContextProvider from './context/ToolContextProvider';

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [])

  // const [shapesList, setShapesList] = useState([{ id: 0, type: "rectangle", data: { x: 5, y: 5, width: 100, height: 100 } }]);

  return (
    <>
      <ToolContextProvider>
        <ToolsBox />
        <DrawingCanvas />
      </ToolContextProvider>
    </>
  )
};

export default App;