import React from "react";
import { Box, Typography } from "@mui/material";

const ScienceNews: React.FC = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      bgcolor: "secondary.secondary10",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
    }}
  >
    <Typography>Тут загальні новини</Typography>
  </Box>
);

export default ScienceNews;
