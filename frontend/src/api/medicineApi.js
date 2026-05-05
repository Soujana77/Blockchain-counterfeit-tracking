import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add Medicine
export const addMedicine = (data) => API.post("/addMedicine", data);

// Get Medicine
export const getMedicine = (id) => API.get(`/getMedicine/${id}`);

// Transfer Ownership
export const transferOwnership = (data) =>
  API.post("/transferOwnership", data);