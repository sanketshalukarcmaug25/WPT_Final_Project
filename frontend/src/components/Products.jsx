import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { PRODUCT_API_URL } from "../constants/APIConstants";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  async function fetchProducts() {
    try {
      const token = localStorage.getItem("authToken"); 

      const response = await axios.get(PRODUCT_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);

  
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
      } else {
        toast.error("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  }


  function handleBuyNow(product) {
    toast.success(`You selected ${product.name} — feature coming soon!`);
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🐾 Shop for Your Pet</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <Row xs={1} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image_path}
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
