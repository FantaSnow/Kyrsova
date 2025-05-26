import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const categories = [
  { label: "Загальні", path: "general" },
  { label: "Спорт", path: "sport" },
  { label: "Події", path: "events" },
  { label: "Наука", path: "science" },
  { label: "Культура", path: "culture" },
];

const NewsMiniHeader: React.FC = () => {
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 0 || current < lastScroll.current) {
        setShow(true);
      } else {
        setShow(false);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCategory = location.pathname.split("/").pop();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        height: "63px",
        bgcolor: "secondary.secondary10",
        display: "flex",
        transition: "transform 0.3s, opacity 0.3s",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          bgcolor: "transparent",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.primary10",
            borderRadius: "20px",
            px: 3,
            gap: 1,
            "& .active": {
              position: "relative",
              color: "text.primary",
              "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                left: 6,
                right: 6,
                bottom: 0,
                height: "2px",
                background: "currentColor",
                zIndex: 1,
              },
            },
            "& a": {
              position: "relative",
              textDecoration: "none",
              minWidth: 0,
              px: 2,
              py: 0.5,
              transition: "color 0.2s, background 0.2s",
              "&:hover": {
                color: "text.primary",
                backgroundColor: "primary.primary10",
                "&::after": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  left: 6,
                  right: 6,
                  bottom: 0,
                  height: "2px",
                  zIndex: 1,
                },
              },
              "&:active": {
                color: "text.secondary",
              },
            },
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat.path}
              component={NavLink}
              to={`/news/${cat.path}`}
              sx={{
                bgcolor: "transparent",
                textTransform: "none",
                fontSize: "1rem",
                minWidth: 0,
                padding: 0,
                "&:hover": {
                  bgcolor: "#transparent",
                },
              }}
            >
              {cat.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NewsMiniHeader;
