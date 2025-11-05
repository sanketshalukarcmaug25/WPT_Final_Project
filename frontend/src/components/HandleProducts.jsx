import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { PRODUCT_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";

export function HandleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image_path: ""
  });
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(PRODUCT_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(PRODUCT_API_URL, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message || "Product added successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        quantity: "",
        image_path: ""
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${PRODUCT_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message || "Product deleted");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">⚙️ Manage Product Inventory</h2>

      <Card className="p-4 mb-5 shadow-sm">
        <h4>Add New Product</h4>
        <Form onSubmit={handleAddProduct}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.image_path}
                  onChange={(e) => setNewProduct({ ...newProduct, image_path: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">Add Product</Button>
        </Form>
      </Card>

      <h4 className="mb-3">Current Inventory</h4>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Row xs={1} md={5} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    product.image_path && product.image_path.trim() !== ""
                      ? product.image_path
                      : "https://via.placeholder.com/300"
                  }
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <p><strong>₹{product.price}</strong> | Qty: {product.quantity}</p>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
