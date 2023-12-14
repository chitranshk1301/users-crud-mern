// Header.js
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#notifications">Notifications</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
