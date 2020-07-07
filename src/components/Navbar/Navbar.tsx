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

import { ModeConstants, ModeType } from '../../redux/constants';
import graphActions from '../../redux/actions/graph';
import { SolvingAlgorithmType } from '../../redux/constants/mode';

interface NavbarProps {
  showInstructions: (show: boolean) => void;
}

interface StateProps {
  mode: ModeType;
  algorithm: SolvingAlgorithmType;
}

interface DispatchProps {
  settingWallNodes: () => void;
  settingBridgeNodes: () => void;
  setMode: (mode: ModeType) => void;
  setAlgorithm: (alg: SolvingAlgorithmType) => void;
  resetGraph: () => void;
}

const CustomNavbar: React.FC<NavbarProps & StateProps & DispatchProps> = ({
  showInstructions,
  mode,
  algorithm,
  settingWallNodes,
  settingBridgeNodes,
  setMode,
  setAlgorithm,
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
    <Navbar.Toggle aria-controls="basic-nav-bar" />
    <Navbar.Collapse className="justify-content-end">
      <Nav className="controls">
        <button type="button" onClick={() => settingWallNodes()}>
          Build Walls
        </button>
        <button type="button" onClick={() => settingBridgeNodes()}>
          Build Bridge
        </button>
        <Dropdown id="navbarDropdownTest">
          <Dropdown.Toggle id="algorithm-dropdown">{algorithm}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAlgorithm(ModeConstants.BFS)}>
              {ModeConstants.BFS}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setAlgorithm(ModeConstants.DIJKSTRAS)}
            >
              {ModeConstants.DIJKSTRAS}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAlgorithm(ModeConstants.A_STAR)}>
              {ModeConstants.A_STAR}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button
          type="button"
          onClick={() => {
            // requirements before solving
            if (mode === ModeConstants.EDITING) {
              // now in solving state
              setMode(ModeConstants.SOLVING);
            }
          }}
        >
          Solve
        </button>
        <button
          type="button"
          onClick={() => {
            if (
              mode !== ModeConstants.SOLVING &&
              mode !== ModeConstants.VISUALIZING
            ) {
              // now reseting
              resetGraph();
              setMode(ModeConstants.EDITING);
            }
          }}
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
  mode: state.mode.mode,
  algorithm: state.mode.solvingAlg,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  settingWallNodes: () => dispatch(modeActions.settingWallNodes()),
  settingBridgeNodes: () => dispatch(modeActions.settingBridgeNodes()),
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  setAlgorithm: (alg) => dispatch(modeActions.setSolvingAlg(alg)),
  resetGraph: () => dispatch(graphActions.resetGraph()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
