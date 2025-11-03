import axios from "axios";
import { CONTACT_API_URL } from "../constants/APIConstants";

export async function addContact(formData) {
  return axios.post(CONTACT_API_URL, formData);
}

export async function getAllContacts() {
  return axios.get(CONTACT_API_URL);
}
