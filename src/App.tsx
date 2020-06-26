import React from 'react';
import './App.scss';
import Graph from './components/Graph/Graph';
import useWindowDimensions from './components/WindowDimensions/WindowDimensions';

const pxToVh = (px: number): number => (px * 0.16233766233766234);
const vhToPx = (vh: number): number => (vh / 0.16233766233766234);

const App = () => {
  const { width, height } = useWindowDimensions();
  
  return (
    <div className="App">
      <Graph width={Math.floor(pxToVh(width) / 5)} height={Math.floor(pxToVh(height) / 5)} />
    </div>
  );
}

export default App;
