import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  return <div>Detalhes do produto {id}</div>;
};

export default ProductDetails;

// pages/NotFound.jsx
import React from "react";

const NotFound = () => <h2>Página não encontrada</h2>;

export default NotFound;

// api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;
