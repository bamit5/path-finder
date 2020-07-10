import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Introduction.scss';
import { connect } from 'react-redux';
import BrickWall from '../../assets/BrickWall.png';
import HayWall from '../../assets/HayWall.jpg';

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
      <h1 className="instructions-header">Welcome to Path Finder!</h1>

      <p className="instructions-q">What's a pathfinding algorithm?</p>
      <p className="instructions-a">
        Simply an algorithm that tries to find the shortest path, normally
        between a <span className="start">start</span> and
        <span className="end"> end</span> node! This website helps visualize
        pathfinder algorithms.
      </p>

      <p className="instructions-q">How does a pathfinding algorithm work?</p>
      <p className="instructions-a">
        Basically, each node has a "cost" of moving from one node to another,
        and pathfinding algorithms try to reduce the total cost as much as
        possible.
      </p>
      <p className="instructions-note">
        Here, a movement from one node to a regular node has a cost of 1.
      </p>

      <p className="instructions-q">What are walls and bridges?</p>
      <p className="instructions-a">
        There are 2 types of walls. A{' '}
        <img src={BrickWall} alt="Brick wall." className="wall-type-img" />{' '}
        brick wall is impassable. A{' '}
        <img src={HayWall} alt="Hay wall." className="wall-type-img" /> hay wall
        is passable, but requires an extra cost of 5.
        <br />A <span className="bridge">bridge</span> node is a stopping point
        midway between the <span className="start">start</span> and
        <span className="end"> end</span> node where the path must cross.
      </p>
      <p className="instructions-note">
        What's the point of a hay wall? Brick is too heavy to move, but hay is
        pretty light! Sometimes, it's faster (aka less cost) to move a hay wall
        then to walk around it.
      </p>

      <p className="instructions-q">How do I use Path Finder?</p>

      <p className="instructions-a">
        1) Set up the graph by dragging around the{' '}
        <span className="start">start</span> and
        <span className="end"> end</span> nodes, building{' '}
        <img src={BrickWall} alt="Brick wall." className="wall-type-img" />{' '}
        brick and{' '}
        <img src={HayWall} alt="Hay wall." className="wall-type-img" /> hay
        walls, or adding and dragging a <span className="bridge">bridge</span>{' '}
        node.
      </p>
      <p className="instructions-note">
        Build brick or hay walls by selecting which wall from the navbar, and
        then drag anywhere on the graph to build it.
        <br />
        Click the "Add Bridge" button to add a bridge to the graph! Then drag
        wherever your heart desires.
      </p>

      <p className="instructions-a">
        2) Pick an algorithm from the navbar dropdown.
      </p>
      <p className="instructions-note">
        Feel free to Google the algorithms to find out how they work! These are
        famous algorithms, with plenty of resources available online.
        <br />
        Some algorithms cannot be used with weighted nodes (aka Hay nodes)!
        These algorithms, such as Breadth First Search, will use plain black
        walls instead of brick or hay walls.
      </p>

      <p className="instructions-a">
        3) Choose at which speed you would like to visualize the algorithm, and
        click solve to watch the magic happen!
      </p>
      <p className="instructions-note">
        Here's a tip! Once Path Finder has finished visualizing, you can drag
        around the start, end, or bridge node and the graph will be updated
        immediately. Use this to quickly check out how changes affect the
        shortest path and visited nodes.
      </p>

      <p className="instructions-q">
        Click on the question icon to see these explanations again.
      </p>
      <button type="button" onClick={() => setShow(false)}>
        Close
      </button>
    </div>
  </Modal>
);

export default connect()(Introduction);
