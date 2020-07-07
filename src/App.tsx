import React, { useState } from 'react';
import './App.scss';
import { connect } from 'react-redux';

import Graph from './components/Graph/Graph';
import useWindowDimensions from './components/WindowDimensions/WindowDimensions';
import Navbar from './components/Navbar/Navbar';
import { pxToVh } from './constants/constants';
import Introduction from './components/Introduction/Introduction';

const nodeSize = 4; // TODO should go in constants. can you somehow connect this with the css file?
const navBarHeight = 56; // TODO should go in constants. can you somehow connect this with the css file?

const App = () => {
  const { width, height } = useWindowDimensions();
  const [show, setShow] = useState<boolean>(true);

  return (
    <div className="App">
      <Introduction show={show} setShow={setShow} />
      <Navbar showInstructions={setShow} />
      <Graph
        width={Math.floor(pxToVh(width) / nodeSize)}
        height={Math.floor((pxToVh(height) - pxToVh(navBarHeight)) / nodeSize)}
      />
    </div>
  );
};

export default connect()(App);
