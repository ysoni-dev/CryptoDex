import React from "react";
import Layout1 from "./Layouts/LayoutA";
import { MyContextProvider } from "./Apis/MyContext";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Layout2 from "./Layouts/LayoutB";
import Layout3 from "./Layouts/LayoutC";
import './App.css'
const ResponsiveGridLayout = WidthProvider(Responsive);


function App() {
  const layouts = {
    lg: [
      { i: "a", x: 0, y: 0, w: 4, h: 6 },
      { i: "b", x: 4, y: 0, w: 8, h: 12 },
      { i: "c", x: 0, y: 0, w: 4, h: 6 }
    ]
  };

  return (
    <MyContextProvider>
      <div className="App">
        <h1>Crypto Calculator</h1>

        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          isDraggable
          isRearrangeable
          isResizable
          draggableHandle=".drag-handle"
          resizeHandles={['s', 'e', 'w', 'n', 'se', 'sw', 'ne', 'nw']}
        >
          <div className="drag-handle  layoutA" key="a">
            <Layout1 />
          </div>
          <div className="drag-handle  layoutB" key="b">
            <Layout2 />
          </div>
          <div className="drag-handle  layoutC" key="c">
            <Layout3 />
          </div>
        </ResponsiveGridLayout>
      </div>
    </MyContextProvider>
  );
}


export default App;
