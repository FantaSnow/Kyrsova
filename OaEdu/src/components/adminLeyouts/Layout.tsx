import React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "secondary.secondary10",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </Box>
  );
};

export default AdminLayout;
