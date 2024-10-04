import { useEffect } from 'react';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';
import ToolsBox from './components/ToolsBox';
import ToolContextProvider from './context/ToolContextProvider';
import RectContextProvider from './context/RectContextProvder';
import LineContextProvider from './context/LineContextProvider';
import CircleContextProvider from './context/CircleContextProvider';
import ShapeContextProvider from './context/ShapeContextProvider';

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [])

  return (
    <>
      <ShapeContextProvider>
        <CircleContextProvider>
          <LineContextProvider>
            <RectContextProvider>
              <ToolContextProvider>
                <ToolsBox />
                <DrawingCanvas />
              </ToolContextProvider>
            </RectContextProvider>
          </LineContextProvider>
        </CircleContextProvider>
      </ShapeContextProvider>
    </>
  )
};

export default App;