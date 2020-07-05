import './Navbar.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO

// TODO
// eslint-disable-next-line sort-imports
import { RootState } from '../../redux/reducers';
import modeActions from '../../redux/actions/mode';
import { Point } from '../../constants/constants';
import { ModeConstants, ModeType } from '../../redux/constants';
import graphActions from '../../redux/actions/graph';

interface StateProps {
  mode: ModeType;
  startNode: Point | null;
  endNode: Point | null;
}

interface DispatchProps {
  settingStartNode: () => void;
  settingEndNode: () => void;
  settingWallNodes: () => void;
  settingBridgeNodes: () => void;
  setMode: (mode: ModeType) => void;
  resetGraph: () => void;
}

const CustomNavbar: React.FC<StateProps & DispatchProps> = ({
  mode,
  startNode,
  endNode,
  settingStartNode,
  settingEndNode,
  settingWallNodes,
  settingBridgeNodes,
  setMode,
  resetGraph,
}) => (
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
    <Navbar.Brand>Path Finder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-nav-bar" />
    <Navbar.Collapse className="justify-content-end">
      <Nav className="controls">
        <button type="button" onClick={() => settingStartNode()}>
          Start Point
        </button>
        <button type="button" onClick={() => settingEndNode()}>
          End Point
        </button>
        <button type="button" onClick={() => settingWallNodes()}>
          Build Walls
        </button>
        <button type="button" onClick={() => settingBridgeNodes()}>
          Build Bridges
        </button>
        <button
          type="button"
          onClick={() => {
            // requirements before solving
            if (startNode && endNode) {
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
  startNode: state.graph.startNode,
  endNode: state.graph.endNode,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  settingStartNode: () => dispatch(modeActions.settingStartNode()),
  settingEndNode: () => dispatch(modeActions.settingEndNode()),
  settingWallNodes: () => dispatch(modeActions.settingWallNodes()),
  settingBridgeNodes: () => dispatch(modeActions.settingBridgeNodes()),
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  resetGraph: () => dispatch(graphActions.resetGraph()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
