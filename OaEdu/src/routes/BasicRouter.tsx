import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/leyouts/Layout";
import Login from "../components/Login/Login";
import HomePage from "../features/HomePage/HomePage"; // Виправлено шлях до HomePage
import ProtectedRoute from "./ProtectedRoute";

const BasicRouter: React.FC = () => {
  return (
    <Routes>
      {/* Обгортаємо Login у Layout */}
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      {/* Захищені маршрути */}
      <Route
        element={
          <Layout>
            <ProtectedRoute />
          </Layout>
        }
      >
        <Route path="/HomePage" element={<HomePage />} />
      </Route>

      {/* Редирект на /login для невідомих маршрутів */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default BasicRouter;
