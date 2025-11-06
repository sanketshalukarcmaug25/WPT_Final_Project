import axios from "axios";
import { ORDER_API_URL } from "../constants/APIConstants";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${ORDER_API_URL}/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
