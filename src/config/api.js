import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/tradrly/api/v1", // Remplace par ton URL d'API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
