import React, { useEffect, useState } from "react";
import axios from "axios";
import { PET_API_URL } from "../constants/APIConstants";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export  function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    image_path: "",
  });

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${PET_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPet(response.data);
    } catch (error) {
      console.error("Error fetching pet details:", error);
      toast.error("Failed to fetch pet details");
    }
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`${PET_API_URL}/${id}`, pet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pet updated successfully!");
      navigate("/pets/handle");
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Failed to update pet");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "blue" }}>
        ✏️ Edit Pet
      </h2>

      <form onSubmit={handleUpdate} className="card p-4 shadow-sm">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="type"
            value={pet.type}
            onChange={handleChange}
            placeholder="Type"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="breed"
            value={pet.breed}
            onChange={handleChange}
            placeholder="Breed"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="age"
            value={pet.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            value={pet.price}
            onChange={handleChange}
            placeholder="Price (₹)"
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="description"
            value={pet.description}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
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

        <button type="submit" className="btn btn-primary">
          Update Pet
        </button>
      </form>
    </div>
  );
}
