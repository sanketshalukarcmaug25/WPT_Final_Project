import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { PET_API_URL } from "../constants/APIConstants";

export function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPets() {
    try {
      const response = await axios.get(PET_API_URL);
      setPets(response.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  }

  function handleAdoptNow(pet) {
    
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === pet.id && item.type === "pet");

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: pet.id,
        name: pet.breed,
        price: pet.price,
        quantity: 1,
        image_path: pet.image_path,
        type: "pet",
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success(`${pet.breed} added to cart!`);
  }

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🐾 Available Pets</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading pets...</p>
        </div>
      ) : pets.length === 0 ? (
        <p className="text-center">No pets available.</p>
      ) : (
        <Row xs={1} md={5} className="g-4">
          {pets.map((pet) => (
            <Col key={pet.id}>
              <Card className="h-200 shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    pet.image_path ||
                    "https://via.placeholder.com/300"
                  }
                  alt={pet.breed}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{pet.breed}</Card.Title>
                  <Card.Text>{pet.description}</Card.Text>
                  <p className="mb-1">
                    <strong>Type:</strong> {pet.type}
                  </p>
                  <p className="mb-1">
                    <strong>Age:</strong> {pet.age}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{pet.price}
                  </p>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAdoptNow(pet)}
                  >
                    Adopt Now
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
