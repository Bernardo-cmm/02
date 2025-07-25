import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Products from "../pages/Products/products";
import ProductDetails from "../pages/ProductDetails/productdetails";
import NotFound from "../pages/NotFound/notfound";
import { useAuth } from "../context/authcontext";
import ProductForm from "../pages/Products/ProductForm";
import { Layout } from "../components/Layout/Layout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
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

      <Route
        path="/produtos/novo"
        element={
          <PrivateRoute>
            <ProductForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/produtos/editar/:id"
        element={
          <PrivateRoute>
            <ProductForm />
          </PrivateRoute>
        }
      />

      <Route path="/produtos/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Router;
