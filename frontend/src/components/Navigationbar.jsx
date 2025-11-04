import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export function Navigationbar() {
  const navigate = useNavigate();

  // ✅ Get role from localStorage
  const userRole = localStorage.getItem("userRole");

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm py-1">
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-4 text-warning"
        >
          🐾 Our Pet Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center">

            {/* ✅ If ADMIN */}
            {userRole === "ADMIN" ? (
              <>
                <Nav.Link as={NavLink} to="/" end>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/pets">
                  Pets
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products/handle">
                  Add Product
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact-us/request">
                  Contact Requests
                </Nav.Link>
              </>
            ) : (
              /* ✅ If CUSTOMER or not logged in */
              <>
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
              </>
            )}

            {/* ✅ Right side buttons */}
            <div className="d-flex ms-3">
              {userRole ? (
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2 px-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2 px-3"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2 px-3"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
