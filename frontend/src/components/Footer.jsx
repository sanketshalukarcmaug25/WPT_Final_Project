import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2e2e2dff",
        color: "#fff",
        padding: "50px 0 20px",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Brand Section */}
          <Col md={4} className="mb-4">
            <h4 className="fw-bold text-white">Pet Store</h4>
            <p className="text-light small">
              Making pet adoption and care effortless and trustworthy across India.
            </p>
          </Col>

          {/* Links Section */}
          <Col md={4} className="mb-4">
            <h5 className="fw-semibold text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-light text-decoration-none">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

       
          <Col md={4} className="mb-4">
            <h5 className="fw-semibold text-white mb-3">Contact</h5>
            <p className="mb-1 text-light small">📧 supportpetstore@gmail.com</p>
            <p className="mb-1 text-light small">📞 +91 98765 43210</p>
            <p className="text-light small">📍 Pune, India</p>
          </Col>
        </Row>

        <hr style={{ borderColor: "#444" }} />

        <Row>
          <Col className="text-center">
            <p className="text-light small mb-0">
              © {new Date().getFullYear()} <strong>Pet Store</strong>. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
