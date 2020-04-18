import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: '#000' }} href="#change-password">Change Password</Nav.Link>
    <Nav.Link style={{ color: '#000' }} href="#update-user">Change Profile</Nav.Link>
    <Nav.Link style={{ color: '#000' }} href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link style={{ color: '#000' }} href="#problem-create">Problem Create</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link style={{ color: '#000' }} href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link style={{ color: '#000' }} href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link style={{ color: '#000' }} href="#/">Home</Nav.Link>
    <Nav.Link style={{ color: '#000' }} href="#problems">Problems</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect fixed="top" style={{ backgroundColor: '#c2760b' }} variant="dark" expand="md">
    <Navbar.Brand href="#" style={{ color: '#000' }}>
      Whats Your Problem?
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span style={{ color: '#000' }} className="navbar-text mr-2">Welcome, {user.username ? user.username : user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
