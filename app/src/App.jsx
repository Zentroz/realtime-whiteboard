import { useEffect } from 'react';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';
import ToolsBox from './components/ToolsBox';
import ToolContextProvider from './context/ToolContextProvider';
import RectContextProvider from './context/RectContextProvder';
import LineContextProvider from './context/LineContextProvider';
import CircleContextProvider from './context/CircleContextProvider';
import ShapeContextProvider from './context/ShapeContextProvider';
import MenuButton from './components/MenuButton';
import RoomContextProvider from './context/RoomContextProvider';

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [])

  return (
    <>
      <RoomContextProvider>
        <ShapeContextProvider>
          <CircleContextProvider>
            <LineContextProvider>
              <RectContextProvider>
                <ToolContextProvider>
                  <ToolsBox />
                  <DrawingCanvas />
                  <MenuButton />
                </ToolContextProvider>
              </RectContextProvider>
            </LineContextProvider>
          </CircleContextProvider>
        </ShapeContextProvider>
      </RoomContextProvider>
    </>
  )
};

export default App;