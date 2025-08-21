import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // backend Laravel
});

export default api;