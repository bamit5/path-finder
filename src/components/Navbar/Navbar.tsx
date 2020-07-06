import './Navbar.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO

// TODO
// eslint-disable-next-line sort-imports
import { RootState } from '../../redux/reducers';
import modeActions from '../../redux/actions/mode';

import { ModeConstants, ModeType } from '../../redux/constants';
import graphActions from '../../redux/actions/graph';
import { SolvingAlgorithmType } from '../../redux/constants/mode';

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

const CustomNavbar: React.FC<StateProps & DispatchProps> = ({
  mode,
  algorithm,
  settingWallNodes,
  settingBridgeNodes,
  setMode,
  setAlgorithm,
  resetGraph,
}) => (
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
    <Navbar.Brand>Path Finder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-nav-bar" />
    <Navbar.Collapse className="justify-content-end">
      <Nav className="controls">
        <button type="button" onClick={() => settingWallNodes()}>
          Build Walls
        </button>
        <button type="button" onClick={() => settingBridgeNodes()}>
          Build Bridges
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
