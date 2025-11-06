import axios from "axios";
import { LOGIN_API_URL } from "../constants/APIConstants";

export async function loginUser(data) {
  return axios.post(LOGIN_API_URL, data);
}

export function getUserRole() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
}

export function isAdmin() {
  return getUserRole() === 'ADMIN';
}
