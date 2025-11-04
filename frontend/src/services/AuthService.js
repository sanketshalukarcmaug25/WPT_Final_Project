import axios from "axios";
import { LOGIN_API_URL } from "../constants/APIConstants";

export async function loginUser(data) {
  return axios.post(LOGIN_API_URL, data);
}
