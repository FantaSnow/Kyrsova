import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NewsDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, title, description, meta, faculty, date, content, chatImage } =
    location.state || {};

  if (!title) {
    navigate(-1);
    return null;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4, position: "relative" }}>
      <Typography variant="h1" color="text.primary" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h3" color="text.primary">
            {faculty || "Economy faculty"}
          </Typography>
          <Typography
            variant="bodyM"
            color="text.primary"
            sx={{ mb: 2, display: "block" }}
          >
            {meta || "Fri, May 23, 2025 at 11:23 PM GMT+3 · 3 min read"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Button
            sx={{
              position: "relative",
              right: 0,
              zIndex: 2,
            }}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Назад
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "primary.primary20",
          borderRadius: 4,
          mb: 2,
          minHeight: 460,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={chatImage || image}
          alt={title}
          style={{
            width: "100%",
            height: 460,
            objectFit: "cover",
            borderRadius: 12,
            display: "block",
          }}
        />
      </Box>

      {/* Основний текст новини */}
      <Box
        sx={{
          p: 2,
          mb: 5,
        }}
      >
        <Typography
          variant="bodyL"
          color="text.primary"
          sx={{ whiteSpace: "pre-line" }}
        >
          {description || content || "Тут буде текст новини..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsDetails;
