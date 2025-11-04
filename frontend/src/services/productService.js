import axios from "axios";
import { PRODUCT_API_URL } from "../constants/APIConstants";

// ✅ Get all products
export async function getAllProducts() {
  return axios.get(`${PRODUCT_API_URL}/all`);
}
