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

    return (
        <Container className="mt-4">
            <Alert variant="primary" className="fw-bold text-center">
                Contact Requests that we have Recived
            </Alert>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" />
                    <p>Loading...</p>
                </div>
            ) : queries.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    No contact requests found.
                </Alert>
            ) : (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="table-light">
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
            )}
        </Container>
    );
}
