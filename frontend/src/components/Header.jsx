import { useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { userLogout } from "../store/Slices/User/UserSlice";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(toggleLoading(true));
    dispatch(userLogout());
    setTimeout(() => dispatch(toggleLoading(false)), 2000);
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userLogin.userInfo ? (
                <NavDropdown
                  title={
                    <i className="fas fa-user px-1">
                      <span className="ms-2">{userLogin.userInfo.name}</span>
                    </i>
                  }
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1" />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
