import React, { useEffect, useState } from "react";
import axios from "axios";
import { PET_API_URL } from "../constants/APIConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function HandlePets() {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({
    type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    image_path: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(PET_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to fetch pets");
    }
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`${PET_API_URL}`, pet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pet added successfully!");
      setPet({
        type: "",
        breed: "",
        age: "",
        price: "",
        description: "",
        image_path: "",
      });
      fetchPets();
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error("Failed to add pet");
    }
  };

  const handleDeletePet = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${PET_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pet deleted successfully!");
      fetchPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Failed to delete pet");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        🐾 Manage Pets Inventory
      </h2>

      <form onSubmit={handleAddPet} className="card p-4 shadow-sm mb-4">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="type"
              value={pet.type}
              onChange={handleChange}
              placeholder="Type"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="breed"
              value={pet.breed}
              onChange={handleChange}
              placeholder="Breed"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              name="age"
              value={pet.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="number"
              className="form-control"
              name="price"
              value={pet.price}
              onChange={handleChange}
              placeholder="Price (₹)"
              required
            />
          </div>
          <div className="col">
            <textarea
              className="form-control"
              name="description"
              value={pet.description}
              onChange={handleChange}
              placeholder="Describe the pet"
              required
            ></textarea>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="image_path"
            value={pet.image_path}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Pet
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.type}</td>
              <td>{p.breed}</td>
              <td>{p.age}</td>
              <td>₹{p.price}</td>
              <td>{p.description}</td>
              <td>
                <img
                  src={p.image_path}
                  alt={p.breed}
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/edit-pet/${p.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeletePet(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
