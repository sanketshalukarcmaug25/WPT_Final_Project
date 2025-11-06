import { useEffect, useState } from "react";
import { fetchOrders } from "../services/OrderService";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";

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

  if (loading) return (
    <Container className="my-4">
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading orders...</p>
      </div>
    </Container>
  );

  if (error) return (
    <Container className="my-4">
      <div className="text-center my-5">
        <p>Error: {error}</p>
      </div>
    </Container>
  );

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {orders.map((order, index) => (
            <Col key={order.id}>
              <Card className="h-100 shadow-sm">
                {order.item_image && (
                  <Card.Img variant="top" src={`https://via.placeholder.com/300`} />
                )}
                <Card.Body>
                  <Card.Title>Order {orders.length - index}</Card.Title>
                  <Card.Text>
                    <strong>Item:</strong> {order.item_name}<br />
                    <strong>Quantity:</strong> {order.quantity}<br />
                    <strong>Type:</strong> {order.order_type}<br />
                    <strong>Price:</strong> Rs {order.item_price * order.quantity}<br />
                    <strong>Date:</strong> {new Date(order.date_of_order).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
