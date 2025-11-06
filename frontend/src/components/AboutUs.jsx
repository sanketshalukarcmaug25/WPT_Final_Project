import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

export function AboutUs() {
  return (
    <Container className="my-5">
      {/* Intro Section */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={10}>
          <h1 className="fw-bold mb-3 text-dark">About Our Pet Store</h1>
          <p className="text-secondary fs-5">
            At <strong>Our Pet Store</strong>, we believe pets bring joy,
            comfort, and companionship. We are passionate about helping families
            connect with the perfect pet — and providing them with everything
            they need to thrive.
          </p>
        </Col>
      </Row>

      {/* Who We Are */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <Image
            src="https://t3.ftcdn.net/jpg/10/42/02/50/360_F_1042025002_yi1hBdTT0P08fi31fihf8zR94VnULIAN.jpg"
            alt="Pet care team working together"
            fluid
            rounded
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold mb-3">Who We Are</h3>
          <p className="text-secondary">
            We are a dedicated team of pet lovers who understand the importance
            of finding trustworthy sources for pets and their care. Our mission
            is to promote ethical pet ownership and ensure every animal gets the
            love, safety, and respect it deserves.
          </p>
        </Col>
      </Row>

      {/* What We Do */}
      <Row className="align-items-center mb-5 flex-md-row-reverse">
        <Col md={6}>
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/024/753/284/small/young-handsome-indian-man-posing-in-the-studio-with-his-cute-pekingese-dog-photo.jpg"
            alt="Happy customers with pets"
            fluid
            rounded
            className="shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold mb-3">What We Do</h3>
          <p className="text-secondary">
            From pet adoptions to premium pet supplies, our goal is to make pet
            parenting easier and more rewarding. We offer high-quality food,
            accessories, grooming products, and expert guidance — everything a
            pet parent needs in one place.
          </p>
        </Col>
      </Row>

      {/* Why Choose Us */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h3 className="fw-semibold mb-3">Why Choose Us</h3>
          <ul className="list-unstyled text-secondary fs-5">
            <li>✅ Certified and health-checked pets from trusted sources</li>
            <li>✅ Guidance from experienced veterinarians and trainers</li>
            <li>✅ Transparent adoption and buying process</li>
            <li>✅ Affordable, high-quality pet care essentials</li>
            <li>✅ 24/7 community support for pet owners</li>
          </ul>
        </Col>
      </Row>

      {/* Meet Our Team */}
      <Row className="justify-content-center text-center">
        <h3 className="fw-bold mb-4">Meet Our Team</h3>

        {[
          {
            name: "Sanket Shalukar",
            img: "/images/3.jpg", 
          },
          {
            name: "Shubham Thakur",
            img: "/images/1.png", 
          },
          {
            name: "Shruti Jadhav",
            img: "/images/2.png",
          },
        ].map((member, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card
              className="border-0 shadow-lg h-100"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "300px",
                  overflow: "hidden",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  className="img-fluid"
                  style={{
                    height: "220px",
                    width: "220px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    padding: "10px",
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title className="fw-semibold fs-5">
                  {member.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
