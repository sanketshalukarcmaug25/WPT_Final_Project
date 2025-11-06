import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ORDER_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Login required to place an order!");
      return;
    }

    setLoading(true);

    
    toast.success("Order placed successfully!", { autoClose: 2000 });

    
    localStorage.removeItem("cartItems");
    setCartItems([]);

    
    setTimeout(() => {
      navigate("/orders");
      setLoading(false);
    }, 2000);

    
    const payload = {
      items: cartItems.map((item) => ({
        product_id: item.type === "product" ? item.id : null,
        pet_id: item.type === "pet" ? item.id : null,
        quantity: item.quantity,
      })),
    };

    axios
      .post(ORDER_API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log("Order sent:", res.data))
      .catch((err) =>
        console.error("Order failed in background:", err.response?.data || err)
      );
  };

  return (
    <Container className="my-4">
      {}
      <ToastContainer position="top-center" />

      <h2 className="text-center mb-4">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>Image</th>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="align-middle text-center">
                  <td>
                    <img
                      src={
                        item.image_path ||
                        "https://via.placeholder.com/70"
                      }
                      alt={item.name}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      style={{ width: "80px", margin: "auto" }}
                    />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ₹{total}</h4>
            <Button
              variant="success"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Buy Now 🛍️"}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
