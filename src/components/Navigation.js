import React from 'react'
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Dropdown
} from 'react-bootstrap'
import { DropletHalf } from 'react-bootstrap-icons'
import { useAuth0 } from '@auth0/auth0-react'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = ({ }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

  return (
    <>
      <Navbar bg="white" className="shadow-sm">
        <Container className="py-2">
          <LinkContainer to="/" exact>
            <Navbar.Brand>
              <DropletHalf className="d-inline-block align-middle me-2 text-primary" />
              <span>Fuel Checker</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/" exact>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/map">
                <Nav.Link>Map</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stations">
                <Nav.Link>Stations</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/trends">
                <Nav.Link>Fuel Trends</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav>
              {isLoading &&
                <div className="rounded-circle user-loading bg-light shadow-sm"></div>
              }

              {isAuthenticated && !isLoading &&
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="text" className="p-0 m-0 shadow-none">
                      <img src={user.picture} alt={user.name} className="rounded-circle shadow-sm" width="37px" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Header>Hey, {user.name}</Dropdown.Header>
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              }

              {!isAuthenticated && !isLoading &&
                <>
                  <Nav.Link className="me-2" onClick={() => loginWithRedirect()}>Sign In</Nav.Link>
                  <Button variant="primary" onClick={() => loginWithRedirect()}>Sign Up</Button>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation