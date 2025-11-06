import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  Spinner,
  Carousel,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { PRODUCT_API_URL, PET_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState(
    "url('https://i.pinimg.com/originals/f3/ec/e5/f3ece5f7cfd3e8c3a08fbd71ca7fab6a.jpg')"
  );
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const [productRes, petRes] = await Promise.all([
        axios.get(PRODUCT_API_URL),
        axios.get(PET_API_URL),
      ]);
      setProducts(productRes.data || []);
      setPets(petRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load products or pets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 400, 0);
      setOpacity(newOpacity);
      if (scrollY > 400) {
        setBackground(
          "url('https://i.pinimg.com/originals/f3/ec/e5/f3ece5f7cfd3e8c3a08fbd71ca7fab6a.jpg')"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductClick = (id) => navigate("/products");
  const handlePetClick = (id) => navigate("/pets");

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), ${background}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 1.5s ease-in-out",
        color: "#f8f9fa",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          transition: "background-color 0.5s ease",
        }}
      >
        {/* 🦴 Hero Section */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1 className="fw-bold text-warning display-4 mb-3">
            🦴 Daily Essentials for Your Pets
          </h1>
          <p className="fs-4 text-light mb-4">
            From food to toys — everything your pets love.
          </p>
          <Button
            variant="warning"
            className="fw-semibold text-dark px-4 py-2"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </div>

        {/* Welcome */}
        <Container
          className="my-5"
         
        >
          <div className="text-center bg-dark bg-opacity-50 rounded shadow-lg p-5">
            <h3 className="text-warning fw-bold mb-3">
              Welcome to Our Pet Paradise
            </h3>
            <p className="fs-5 mx-auto" style={{ color: "#f8f9fa" }}>
              Discover the best products and adorable pets — toys, food,
              grooming, and more — all under one roof!
            </p>
          </div>
        </Container>

        {/* 🛒 Featured Products */}
        <Container className="my-5">
          <h3 className="text-center text-warning mb-4 fw-bold">
            🛒 Featured Products
          </h3>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="warning" />
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-light">No products available.</p>
          ) : (
            <div
              className="d-flex overflow-auto gap-3 pb-3 px-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="shadow-sm border-0 flex-shrink-0"
                  style={{
                    width: "250px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product.image_path}
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-semibold text-warning">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="small text-light">
                      {product.description?.substring(0, 60)}...
                    </Card.Text>
                    <p className="fw-bold mb-2 text-light">
                      ₹{product.price}
                    </p>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleProductClick(product.id)}
                    >
                      View Product
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>

        {/* 🐶 Pets */}
        <Container className="my-5">
          <h3 className="text-center text-warning mb-4 fw-bold">
            🐶 Meet Our Lovely Pets
          </h3>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="warning" />
              <p>Loading pets...</p>
            </div>
          ) : pets.length === 0 ? (
            <p className="text-center text-light">No pets available.</p>
          ) : (
            <div
              className="d-flex overflow-auto gap-3 pb-3 px-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {pets.map((pet) => (
                <Card
                  key={pet.id}
                  className="shadow-sm border-0 flex-shrink-0"
                  style={{
                    width: "250px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={pet.image_path || "https://via.placeholder.com/200"}
                    alt={pet.breed}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-semibold text-warning">
                      {pet.breed}
                    </Card.Title>
                    <Card.Text className="text-light small">
                      {pet.description?.substring(0, 60)}...
                    </Card.Text>
                    <p className="fw-bold mb-2 text-light">₹{pet.price}</p>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handlePetClick(pet.id)}
                    >
                      View Pet
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>

        {/* About */}
        <Container className="my-5">
          <div className="text-center py-5 px-3 bg-dark bg-opacity-50 rounded shadow-lg">
            <h3 className="text-warning fw-bold mb-3">About Our Pet Store</h3>
            <p className="fs-5 mx-auto" style={{ color: "#f8f9fa", maxWidth: "800px" }}>
              We started our journey with one simple goal — to make pets’ lives
              happier and healthier. From adorable puppies to premium food and
              accessories, we bring you everything your furry family deserves.
            </p>
          </div>
        </Container>

        {/* Testimonials */}
        <Container className="my-5">
          <div className="text-center py-5 px-3 bg-dark bg-opacity-50 rounded shadow-lg">
            <h3 className="text-warning fw-bold mb-4">What Our Customers Say</h3>
            <Carousel
              indicators
              interval={4000}
              fade
              pause={false}
              className="mx-auto"
              style={{ maxWidth: "800px" }}
            >
              {[
                {
                  quote:
                    "Amazing products and super fast delivery! My dog loves the new toy.",
                  name: "- Priya Sharma",
                },
                {
                  quote:
                    "Great variety of food and grooming items. Highly recommend!",
                  name: "- Rohan Deshmukh",
                },
                {
                  quote: "Best pet store in town! Excellent customer service.",
                  name: "- Sneha Patil",
                },
              ].map((review, i) => (
                <Carousel.Item key={i}>
                  <p className="fs-5 text-light fst-italic">{review.quote}</p>
                  <p className="fw-bold text-warning mb-0">{review.name}</p>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Container>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-3 mt-5">
          <p className="mb-0">
            © {new Date().getFullYear()} 🐾 Our Pet Store — All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
