import './Navbar.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { RootState } from '../../redux/reducers';
import modeActions from '../../redux/actions/mode';

import { ModeConstants, ModeType, WallNodeType } from '../../redux/constants';
import graphActions from '../../redux/actions/graph';
import { SolvingAlgorithmType, SpeedType } from '../../redux/constants/mode';
import BrickWall from '../../assets/BrickWall.png';
import HayWall from '../../assets/HayWall.jpg';

interface NavbarProps {
  showInstructions: (show: boolean) => void;
}

interface StateProps {
  mode: ModeType;
  alg: SolvingAlgorithmType;
  bridgeNodeExists: boolean;
  wallNodeType: WallNodeType;
  speed: SpeedType;
}

interface DispatchProps {
  setWallNodeType: (wallNodeType: WallNodeType) => void;
  toggleBridgeNode: () => void;
  setMode: (mode: ModeType) => void;
  setAlg: (alg: SolvingAlgorithmType) => void;
  setSpeed: (speed: SpeedType) => void;
  resetGraph: () => void;
}

const CustomNavbar: React.FC<NavbarProps & StateProps & DispatchProps> = ({
  showInstructions,
  mode,
  alg,
  bridgeNodeExists,
  wallNodeType,
  speed,
  setWallNodeType,
  toggleBridgeNode,
  setMode,
  setAlg,
  setSpeed,
  resetGraph,
}) => (
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
    <Navbar.Brand>
      Path Finder
      <FontAwesomeIcon
        icon={faQuestionCircle}
        onClick={() => showInstructions(true)}
        className="question-icon"
      />
    </Navbar.Brand>

    <Navbar.Text>{mode}</Navbar.Text>

    <Navbar.Toggle aria-controls="basic-nav-bar" />
    <Navbar.Collapse className="justify-content-end">
      <Nav className="controls">
        {
          // only show the brick or hay dropdown if the algorithm can be weighted
          alg !== ModeConstants.BFS && (
            <Dropdown id="navbar-wall-dropdown">
              <Dropdown.Toggle
                id="wall-dropdown"
                disabled={
                  // disable wall node type switch button when not in editing mode
                  mode !== ModeConstants.EDITING
                }
              >
                Building
                <img
                  src={
                    wallNodeType === ModeConstants.BRICK_WALL
                      ? BrickWall
                      : HayWall
                  }
                  alt="The current wall node being built."
                  className="building-wall-type-img"
                />
                {wallNodeType === ModeConstants.BRICK_WALL ? 'Brick ' : 'Hay '}
                Walls
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setWallNodeType(ModeConstants.BRICK_WALL)}
                >
                  Build
                  <img
                    src={BrickWall}
                    alt="Click to choose to build a brick wall type."
                    className="building-wall-type-img"
                  />
                  Brick Walls
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setWallNodeType(ModeConstants.HAY_WALL)}
                >
                  Build
                  <img
                    src={HayWall}
                    alt="Click to choose to build a hay wall type."
                    className="building-wall-type-img"
                  />
                  Hay Walls
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        }

        <button
          type="button"
          onClick={() => toggleBridgeNode()}
          disabled={
            // disable adding/removing a bridge mode when not in editing mode
            mode !== ModeConstants.EDITING
          }
        >
          {bridgeNodeExists ? 'Remove Bridge' : 'Add Bridge'}
        </button>

        <Dropdown id="navbar-algorithm-dropdown">
          <Dropdown.Toggle
            id="algorithm-dropdown"
            disabled={
              // disable switching algorithm when not in editing mode
              mode !== ModeConstants.EDITING
            }
          >
            Algorithm: {alg}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAlg(ModeConstants.BFS)}>
              {ModeConstants.BFS}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlg(ModeConstants.DIJKSTRAS)}>
              {ModeConstants.DIJKSTRAS}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlg(ModeConstants.A_STAR)}>
              {ModeConstants.A_STAR}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown id="navbar-speed-dropdown">
          <Dropdown.Toggle
            id="speed-dropdown"
            disabled={
              // disable switching speed when not in editing mode
              mode !== ModeConstants.EDITING
            }
          >
            Speed: {speed}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSpeed(ModeConstants.SLOW)}>
              {ModeConstants.SLOW}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSpeed(ModeConstants.FAST)}>
              {ModeConstants.FAST}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSpeed(ModeConstants.FLASH)}>
              {ModeConstants.FLASH}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSpeed(ModeConstants.IMMEDIATE)}>
              {ModeConstants.IMMEDIATE}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button
          type="button"
          onClick={() => {
            // now in solving state
            setMode(ModeConstants.SOLVING);
          }}
          disabled={
            // disable solve when not in editing mode
            mode !== ModeConstants.EDITING
          }
        >
          Solve
        </button>

        <button
          type="button"
          onClick={() => {
            // now reseting
            resetGraph();
            setMode(ModeConstants.EDITING);

            // check if need to reset "add/remove bridge" button
            if (bridgeNodeExists) toggleBridgeNode();
          }}
          disabled={
            // disable reset when solving/visualizing
            mode === ModeConstants.SOLVING || mode === ModeConstants.VISUALIZING
          }
        >
          Reset
        </button>

        <Nav.Link
          href="https://github.com/bamit5/path-finder"
          target="_blank"
          className="github-wrapper"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = (state: RootState): StateProps => ({
  bridgeNodeExists: state.mode.bridgeNodeExists,
  mode: state.mode.mode,
  alg: state.mode.solvingAlg,
  wallNodeType: state.mode.wallNodeType,
  speed: state.mode.speed,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setWallNodeType: (wallNodeType) =>
    dispatch(modeActions.setWallNodeType(wallNodeType)),
  toggleBridgeNode: () => dispatch(modeActions.toggleBridgeNode()),
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  setAlg: (alg) => dispatch(modeActions.setSolvingAlg(alg)),
  setSpeed: (speed) => dispatch(modeActions.setSpeed(speed)),
  resetGraph: () => dispatch(graphActions.resetGraph()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
