import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/leyouts/Layout";
import Login from "../components/Login/Login";
import HomePage from "../features/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/NotFound/NotFound";

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default BasicRouter;
