import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { PRODUCT_API_URL } from "../constants/APIConstants";
import "react-toastify/dist/ReactToastify.css";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(PRODUCT_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
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

  function handleQuantityChange(productId, value) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Number(value),
    }));
  }

  function handleAddToCart(product) {
    const selectedQuantity = quantities[product.id] || 1;

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += selectedQuantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_path: product.image_path,
        quantity: selectedQuantity,
        type: "product",
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    
    toast.success(`${product.name} added to cart (${selectedQuantity}) 🛒`);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <ToastContainer position="top-center" />
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
                  src={
                    product.image_path ||
                    "https://via.placeholder.com/250"
                  }
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">Qty:</strong>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      style={{ width: "70px" }}
                    />
                  </div>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart 🛒
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
