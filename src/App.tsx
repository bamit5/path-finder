import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import Graph from './components/Graph/Graph';
import useWindowDimensions from './components/WindowDimensions/WindowDimensions';
import Navbar from './components/Navbar/Navbar';
import { pxToVh } from './constants/constants';

const nodeSize = 5; // TODO should go in constants. can you somehow connect this with the css file?

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

export default connect()(App);
