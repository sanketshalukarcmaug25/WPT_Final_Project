import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "../services/AuthService";

export function Navigationbar() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const authToken = localStorage.getItem("authToken");
  const userRole = isAdmin() ? "ADMIN" : localStorage.getItem("userRole");
  const isLoggedIn = !!authToken;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm py-1">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4 text-warning">
          🐾 Our Pet Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center">

            {/* Common links for everyone */}
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/pets">Pets</Nav.Link>

            {/* Admin-specific links */}
            {isLoggedIn && userRole === "ADMIN" && (
              <>
                <Nav.Link as={NavLink} to="/pets/handle">Add Pets</Nav.Link>
                <Nav.Link as={NavLink} to="/products/handle">Add Product</Nav.Link>
                <Nav.Link as={NavLink} to="/contact-us/request">Contact Requests</Nav.Link>
              </>
            )}

            {/* Customer-specific links */}
            {isLoggedIn && userRole === "CUSTOMER" && (
              <>
                <Nav.Link as={NavLink} to="/cart">My Cart</Nav.Link>
                <Nav.Link as={NavLink} to="/orders">My Orders</Nav.Link>
              </>
            )}

            {/* Admin also sees cart and orders */}
            {isLoggedIn && userRole === "ADMIN" && (
              <>
                <Nav.Link as={NavLink} to="/cart">My Cart</Nav.Link>
                <Nav.Link as={NavLink} to="/orders">My Orders</Nav.Link>
              </>
            )}

            {/* Auth buttons */}
            <div className="d-flex ms-3">
              {isLoggedIn ? (
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
