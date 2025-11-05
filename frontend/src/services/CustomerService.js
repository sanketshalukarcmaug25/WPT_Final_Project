import axios from "axios";
import { CUSTOMER_REGISTER_API_URL, API_BASE_URL } from "../constants/APIConstants";

export async function registerCustomer(data) {
  if (data.role === "ADMIN") {
    return axios.post(`${API_BASE_URL}/admins`, data);
  } else {
    return axios.post(CUSTOMER_REGISTER_API_URL, data);
  }
}
