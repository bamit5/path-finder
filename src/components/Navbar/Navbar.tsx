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
import { ChangeableNodeData, Graph, Point } from '../../constants/constants';

import graphActions from '../../redux/actions/graph';

interface StateProps {
  graph: Graph;
  startNode: Point | null;
  endNode: Point | null;
}

interface DispatchProps {
  settingStartNode: () => void;
  settingEndNode: () => void;
  settingWallNodes: () => void;
  settingBridgeNodes: () => void;
  solving: () => void;
  changeNode: (change: ChangeableNodeData) => void;
}

const CustomNavbar: React.FC<StateProps & DispatchProps> = ({
  graph,
  startNode,
  endNode,
  settingStartNode,
  settingEndNode,
  settingWallNodes,
  settingBridgeNodes,
  solving,
  changeNode,
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
            if (!startNode || !endNode) {
              return;
            }
            // now in solving state
            solving();
          }}
        >
          Solve
        </button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = (state: RootState): StateProps => ({
  graph: state.graph.graph,
  startNode: state.graph.startNode,
  endNode: state.graph.endNode,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  settingStartNode: () => dispatch(modeActions.settingStartNode()),
  settingEndNode: () => dispatch(modeActions.settingEndNode()),
  settingWallNodes: () => dispatch(modeActions.settingWallNodes()),
  settingBridgeNodes: () => dispatch(modeActions.settingBridgeNodes()),
  solving: () => dispatch(modeActions.solving()),
  changeNode: (change) => dispatch(graphActions.changeNode(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
