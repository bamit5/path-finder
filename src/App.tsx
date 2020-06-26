import React from 'react';
import './App.scss';
import Graph from './components/Graph/Graph';
import useWindowDimensions from './components/WindowDimensions/WindowDimensions';
import Navbar from './components/Navbar/Navbar';

const pxToVh = (px: number): number => px * 0.16233766233766234;
const vhToPx = (vh: number): number => vh / 0.16233766233766234;
const nodeSize = 5;

const App = () => {
  const { width, height } = useWindowDimensions();

  return (
    <div className="App">
      <Navbar />
      <Graph
        width={Math.floor(pxToVh(width) / nodeSize)}
        height={Math.floor(pxToVh(height) / nodeSize)}
      />
    </div>
  );
};

export default App;
