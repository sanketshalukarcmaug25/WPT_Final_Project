import axios from "axios";
import { PET_API_URL } from "../constants/APIConstants";

// ✅ Get all pets
export async function getAllPets() {
  return axios.get(`${PET_API_URL}/all`);
}
