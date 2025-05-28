import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/leyouts/Layout";
import Login from "../components/login/Login";
import HomePage from "../features/HomePage/HomePage";
import NotFound from "../components/notFound/NotFound";
import NewsLayout from "../components/newsLeyouts/Layout";
import GeneralNews from "../features/NewsPage/categories/GeneralNews";
import SportNews from "../features/NewsPage/categories/SportNews";
import EventsNews from "../features/NewsPage/categories/EventsNews";
import ScienceNews from "../features/NewsPage/categories/ScienceNews";
import CultureNews from "../features/NewsPage/categories/CultureNews";
import NewsDetails from "../features/NewsPage/NewsDetails";
import SchedulePage from "../features/SchedulePage/SchedulePage";
import VolunteeringPage from "../features/VolunteeringPage/VolunteeringPage";
import VolunteeringDetails from "../features/VolunteeringPage/VolunteeringDetails";

const BasicRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />

      {/* ProtectedRoute сторінки */}
      <Route element={<Layout />}>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/volunteering" element={<VolunteeringPage />} />
        <Route path="/volunteering/:id" element={<VolunteeringDetails />} />
        <Route path="/news/:category/:id" element={<NewsDetails />} />
      </Route>

      {/* NewsLayout для новин */}
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

      {/* ProtectedRoute для  сторінок */}
      <Route
        element={
          <Layout>
            <ProtectedRoute />
          </Layout>
        }
      ></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default BasicRouter;
