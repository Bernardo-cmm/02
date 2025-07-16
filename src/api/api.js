import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // sua API local com json-server
});

export default api;