import React from "react";
import { Box, Typography } from "@mui/material";

const GeneralNews: React.FC = () => (
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

export default GeneralNews;
