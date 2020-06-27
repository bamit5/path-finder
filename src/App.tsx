import React from 'react';
import './App.scss';
import Graph from './components/Graph/Graph';
import useWindowDimensions from './components/WindowDimensions/WindowDimensions';
import Navbar from './components/Navbar/Navbar';
import { pxToVh } from './constants/constants';

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
