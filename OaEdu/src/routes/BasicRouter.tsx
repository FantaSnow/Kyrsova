import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/leyouts/Layout";
import Login from "../components/Login/Login";
import HomePage from "../features/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";

const BasicRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />

      <Route
        element={
          <Layout>
            <ProtectedRoute />
          </Layout>
        }
      >
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/news" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default BasicRouter;
