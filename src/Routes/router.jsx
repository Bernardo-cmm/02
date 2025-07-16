import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Products from "../pages/Products/products";
import ProductDetails from "../pages/ProductDetails/productdetails";
import NotFound from "../pages/NotFound/notfound";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/admin"
      element={
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      }
    />
    <Route path="/produtos/:id" element={<ProductDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
