import React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import { Outlet } from "react-router-dom";

interface NewsLayoutProps {
  children?: React.ReactNode;
}

const NewsLayout: React.FC<NewsLayoutProps> = () => {
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

export default NewsLayout;
