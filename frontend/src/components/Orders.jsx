import { useEffect, useState } from "react";
import { fetchOrders } from "../services/OrderService";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./CSS/Orders.css";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  async function fetchOrdersData() {
    try {
      const data = await fetchOrders();
      setOrders(data.reverse());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const pageStyle = {
    minHeight: "100vh",
    width: "100vw",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://media.istockphoto.com/id/1490460153/photo/sleeping-dog-banner-defocused-background.jpg?s=612x612&w=0&k=20&c=gye5hHbrgA5y62Q9Vq1FJplBXEjsuBwlAPPk8x8Km6g=')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "#fff",
    padding: "40px 0",
    overflowX: "hidden",
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "2rem",
    color: "#f8f9fa",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
    marginBottom: "30px",
  };

  const cardStyle = {
    border: "none",
    borderRadius: "15px",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#3434c2ff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const imgStyle = {
    height: "200px",
    objectFit: "cover",
  };

  if (loading)
    return (
      <div style={pageStyle}>
        <Container>
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
            <p>Loading orders...</p>
          </div>
        </Container>
      </div>
    );

  if (error)
    return (
      <div style={pageStyle}>
        <Container>
          <div className="text-center my-5">
            <p>Error: {error}</p>
          </div>
        </Container>
      </div>
    );

  return (
    <div style={pageStyle}>
      <Container>
        <h2 style={titleStyle}>Your Orders</h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ddd", fontSize: "1.2rem" }}>
            No orders found.
          </p>
        ) : (
          <Row xs={1} md={3} className="g-4">
            {orders.map((order, index) => (
              <Col key={order.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(215, 13, 13, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      order.item_image
                        ? order.item_image
                        : "https://static.vecteezy.com/system/resources/thumbnails/003/245/009/small/cute-seamless-pattern-with-colorful-pets-paws-vector.jpg"
                    }
                    style={imgStyle}
                  />
                  <Card.Body>
                    <Card.Title>Order {orders.length - index}</Card.Title>
                    <Card.Text>
                      <strong>Item:</strong> {order.item_name}
                      <br />
                      <strong>Quantity:</strong> {order.quantity}
                      <br />
                      <strong>Type:</strong> {order.order_type}
                      <br />
                      <strong>Price:</strong> Rs{" "}
                      {order.item_price * order.quantity}
                      <br />
                      <strong>Date:</strong>{" "}
                      {new Date(order.date_of_order).toLocaleDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
