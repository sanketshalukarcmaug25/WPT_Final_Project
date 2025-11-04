import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PRODUCT_API_URL } from "../constants/APIConstants";

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${PRODUCT_API_URL}/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
      toast.success(res.data.message || "Product updated successfully!");
      navigate("/products/han");
    } catch (err) {
      toast.error("Failed to update product");
    }
  }

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h3>Edit Product</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={product.quantity}
              onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={product.image_path || ""}
              onChange={(e) => setProduct({ ...product, image_path: e.target.value })}
            />
          </Form.Group>

          <Button type="submit" variant="primary">Update Product</Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate("/products/han")}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
