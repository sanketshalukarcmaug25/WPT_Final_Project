import { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { CONTACT_API_URL } from "../constants/APIConstants";
import { toast, Bounce } from "react-toastify";

export function ContactRequest() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(CONTACT_API_URL);
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      toast.error("Failed to load requests.", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(`${CONTACT_API_URL}/${id}`);
      setQueries(queries.filter((q) => q.id !== id));

      toast.success("Request deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
        theme: "colored",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete request.", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
        theme: "colored",
      });
    }
  };

  // 🔹 Inline styles
  const pageStyle = {
    minHeight: "100vh",
    width: "100vw",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://img.freepik.com/free-photo/pet-accessories-dry-food_23-2148949596.jpg?semt=ais_hybrid&w=740&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "#fff",
    padding: "40px 0",
    overflowX: "hidden",
  };

  const alertStyle = {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#212529",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "1.3rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };

  const tableStyle = {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: "700",
    fontSize: "2rem",
    color: "#f8f9fa",
    textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
    marginBottom: "25px",
  };

  return (
    <div style={pageStyle}>
      <Container>
        <h2 style={headingStyle}>Contact Requests</h2>
        <Alert style={alertStyle} className="text-center">
          Contact Requests that we have received
        </Alert>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
            <p>Loading...</p>
          </div>
        ) : queries.length === 0 ? (
          <Alert variant="warning" className="text-center">
            No contact requests found.
          </Alert>
        ) : (
          <div style={tableStyle}>
            <Table striped bordered hover responsive>
              <thead
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query, index) => (
                  <tr key={query.id}>
                    <td>{index + 1}</td>
                    <td>{query.name}</td>
                    <td>{query.phone}</td>
                    <td>{query.description}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(query.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
}
