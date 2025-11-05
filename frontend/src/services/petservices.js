import axios from "axios";
import { PET_API_URL } from "../constants/APIConstants";


export async function getAllPets() {
  return axios.get(`${PET_API_URL}/all`);
}
