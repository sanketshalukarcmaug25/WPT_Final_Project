import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Navigationbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm py-1">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 text-warning">
          🐾 Our Pet Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/pets">
              Pets
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact-us">
              Contact Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders">
              My Orders
            </Nav.Link>

            <div className="d-flex ms-3">
              <Button variant="outline-warning" size="sm" className="me-2 px-3">
                Login
              </Button>
              <Button variant="warning" size="sm" className="text-dark fw-semibold px-2">
                Sign Up
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
