import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { CONTACT_API_URL } from "../constants/APIConstants";

export function ContactUs() {
  // ✅ FIXED: renamed from [name, setName] to [formData, setFormData]
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.description) {
      toast.error("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await axios.post(CONTACT_API_URL, formData);

      toast.success(response.data.message || "Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

      setFormData({ name: "", phone: "", description: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={7} sm={10}>
            <Card
              className="shadow-lg border-0 rounded-4 p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(6px)",
                opacity: "90%",
              }}
            >
              <Alert
                variant="primary"
                className="text-center fw-semibold rounded-3 mb-4 fs-5"
              >
                📞 Contact Us
              </Alert>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your message"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-4 fw-semibold"
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
