import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// Importing components
import Layout from "../components/leyouts/Layout";
import Login from "../components/login/Login";
import HomePage from "../features/HomePage/HomePage";
import NotFound from "../components/notFound/NotFound";
// Importing news categories
import NewsLayout from "../components/newsLeyouts/Layout";
import GeneralNews from "../features/NewsPage/categories/GeneralNews";
import SportNews from "../features/NewsPage/categories/SportNews";
import EventsNews from "../features/NewsPage/categories/EventsNews";
import ScienceNews from "../features/NewsPage/categories/ScienceNews";
import CultureNews from "../features/NewsPage/categories/CultureNews";

const BasicRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route
        path="/HomePage"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/news"
        element={
          <Layout>
            <NewsLayout />
          </Layout>
        }
      >
        <Route index element={<GeneralNews />} />
        <Route path="general" element={<GeneralNews />} />
        <Route path="sport" element={<SportNews />} />
        <Route path="events" element={<EventsNews />} />
        <Route path="science" element={<ScienceNews />} />
        <Route path="culture" element={<CultureNews />} />
      </Route>

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
