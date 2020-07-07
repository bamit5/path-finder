import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Introduction.scss';
import { connect } from 'react-redux';

interface IntroductionProps {
  show: boolean;
  setShow: (boolean) => void;
}

const Introduction: React.FC<IntroductionProps> = ({ show, setShow }) => (
  <Modal
    size="lg"
    show={show}
    onHide={() => setShow(false)}
    centered
    className="instructions-modal"
  >
    <div className="instructions-text">
      <h1>Welcome!</h1>
      <p className="instructions-q">What's a pathfinding algorithm?</p>
      <p className="instructions-a">
        Simply an algorithm that tries to find the shortest path!
      </p>
      <p className="instructions-note">
        In this graph, a movement from one node to another, unless specified
        differently, has a "cost" of 1, and these algorithms try to reduce that
        cost as much as possible.
      </p>
      <p className="instructions-q">How do I use this?</p>
      <p className="instructions-a">1) Set up the graph.</p>
      <p className="instructions-note">
        Drag around the start (green) node and end (pink) node! Drag on the
        graph to create walls (black) nodes. The pathfinding algorithms cannot
        make a path through these walls.
        <br />
        Click the "Build Bridge" button so you can drag a bridge anywhere on the
        graph!
      </p>
      <p className="instructions-a">2) Pick an algorithm from the dropdown.</p>
      <p className="instructions-note">
        Click on the dropdown and select an algorithm! Next to the algorithms
        are links to sources that explain the algorithm.
      </p>
      <p className="instructions-a">
        3) Click solve and watch the magic happen!
      </p>
      <p className="instructions-q">
        If you need these instructions again, just click on the question icon
        next to the path-finder logo!
      </p>
      <button type="button" onClick={() => setShow(false)}>
        Close
      </button>
    </div>
  </Modal>
);

export default connect()(Introduction);
