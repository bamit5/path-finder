import React from 'react';
import './Navbar.scss';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => (
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
    <Navbar.Brand>Path Finder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-nav-bar"/>
    <Navbar.Collapse className="justify-content-end">
      <Nav className="controls">
        <button>Start Point</button>
        <button>End Point</button>
        <button>Build Walls</button>
        <button>Build Bridges</button>
        <button>Drop Bombs</button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

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
)*/

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

export default CustomNavbar;