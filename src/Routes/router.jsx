import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import Login from "../pages/Login/login.jsx";
import Products from "../pages/Products/products.jsx";
import ProductDetails from "../pages/ProductDetails/productdetails.jsx";
import NotFound from "../pages/NotFound/notfound.jsx";
import { useAuth } from "./context/authcontext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/products"
      element={
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      }
    />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
