import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import useAuthentication from "../hook/useAuthentication";
export default function Header() {
  const { authentication, setAuthentication } = useAuthentication();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    setAuthentication({});
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Navbar.Brand href="/">
            <NavLink className="nav-link" to="/">
              <FontAwesomeIcon icon={faSchool} className="mx-2" />
              STATIONERY
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/">
                    Action
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink
                className="nav-link"
                to="/"
                hidden={authentication?.role ? false : true}
              >
                Message
              </NavLink>
              <NavLink
                className="nav-link"
                to="/product-management"
                hidden={authentication?.role === "ADMIN" ? false : true}
              >
                Management
              </NavLink>
              <NavLink
                className="nav-link"
                to="/cart"
                hidden={authentication?.role === "USER" ? false : true}
              >
                Cart
              </NavLink>
              <NavLink
                className="nav-link"
                to="/login"
                hidden={authentication?.role ? true : false}
              >
                Login
              </NavLink>
              <NavLink
                className="nav-link"
                to="/registration"
                hidden={authentication?.role ? true : false}
              >
                Registration
              </NavLink>
              <NavDropdown
                title={`Welcome ${authentication.username}`}
                id="navbarScrollingDropdown"
                hidden={authentication?.role ? false : true}
              >
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/personal-information">
                    Personal Information
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink className="nav-link" onClick={handleLogOut}>
                    Logout
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
