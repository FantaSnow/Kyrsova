import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/leyouts/Layout";
import Login from "../components/Login/Login";
import HomePage from "../features/HomePage/HomePage";
import NotFound from "../components/NotFound/NotFound";
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
import SchedulesAdminPage from "../features/AdminPage/categories/SchedulesAdmin";
import AdminLeyout from "../components/adminLeyouts/Layout";
import TeacherAdminPage from "../features/AdminPage/categories/TeacherAdmin";
import SubjectAdmin from "../features/AdminPage/categories/SubjectAdmin";
import SpecialtyAdmin from "../features/AdminPage/categories/SpecialtyAdmin";
import RoleAdmin from "../features/AdminPage/categories/RoleAdmin";
import DepartmentAdmin from "../features/AdminPage/categories/DepartmentAdmin";
import GroupAdmin from "../features/AdminPage/categories/GroupAdmin";
import ClassTypeAdmin from "../features/AdminPage/categories/ClassTypeAdmin";
import ClassNumberAdmin from "../features/AdminPage/categories/ClassNumberAdmin";
import NewsAdmin from "../features/AdminPage/categories/NewsAdmin";

const BasicRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />

      {/* NoProtectedRoute сторінки */}
      <Route element={<Layout />}>
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

      {/* ProtectedRoute для сторінок */}
      <Route
        element={
          <Layout>
            <ProtectedRoute />
          </Layout>
        }
      >
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Route>

      <Route
        path="/AdminPanel"
        element={
          <ProtectedRoute role="Admin">
            <Layout>
              <AdminLeyout />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route index element={<SchedulesAdminPage />} />
        <Route path="SchedulesAdmin" element={<SchedulesAdminPage />} />
        <Route path="TeacherAdmin" element={<TeacherAdminPage />} />
        <Route path="SubjectAdmin" element={<SubjectAdmin />} />
        <Route path="SpecialtyAdmin" element={<SpecialtyAdmin />} />
        <Route path="RoleAdmin" element={<RoleAdmin />} />
        <Route path="DepartmentAdmin" element={<DepartmentAdmin />} />
        <Route path="GroupAdmin" element={<GroupAdmin />} />
        <Route path="ClassTypeAdmin" element={<ClassTypeAdmin />} />
        <Route path="ClassNumberAdmin" element={<ClassNumberAdmin />} />
        <Route path="NewsAdmin" element={<NewsAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default BasicRouter;
