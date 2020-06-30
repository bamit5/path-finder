import './Navbar.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// TODO
import { ModeType } from '../../redux/constants';
// TODO
// eslint-disable-next-line sort-imports
import { RootState } from '../../redux/reducers';
import modeActions from '../../redux/actions/mode';

interface StateProps {
  mode: ModeType;
}

interface DispatchProps {
  settingStartNode: () => void;
  settingEndNode: () => void;
  settingWallNodes: () => void;
  settingBridgeNodes: () => void;
}

const CustomNavbar: React.FC<StateProps & DispatchProps> = ({
  mode,
  settingStartNode,
  settingEndNode,
  settingWallNodes,
  settingBridgeNodes,
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
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

/* TODO
const Navbar = () => (
  <div className="navbar">
    <h1>Logo</h1>

    <div className="float-right">
      <button>
        blee bloop
      </button>
    </div>
  </div>
) */

/*
        <NavDropdown title="test 0" id="navbarDropdownTest">
          <NavDropdown.Item>
            Test
          </NavDropdown.Item>
          <NavDropdown.Item>
            Test
          </NavDropdown.Item>
          <NavDropdown.Item>
            Test
          </NavDropdown.Item>
          <NavDropdown.Item>
            Test
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="test 1" id="testttt">
          <NavDropdown.Item>YUH</NavDropdown.Item>
        </NavDropdown>
        */

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  settingStartNode: () => dispatch(modeActions.settingStartNode()),
  settingEndNode: () => dispatch(modeActions.settingEndNode()),
  settingWallNodes: () => dispatch(modeActions.settingWallNodes()),
  settingBridgeNodes: () => dispatch(modeActions.settingBridgeNodes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
