import axios from "axios";
import { CUSTOMER_REGISTER_API_URL } from "../constants/APIConstants";

export async function registerCustomer(data) {
  return axios.post(CUSTOMER_REGISTER_API_URL, data);
}
