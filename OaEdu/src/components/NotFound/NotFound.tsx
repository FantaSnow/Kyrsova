import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/404.svg?react";
import { getPaletteCssVars } from "../../utils/getPaletteCssVars";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const iconColors = getPaletteCssVars();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "primary.primary30",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "500px",
      }}
    >
      {/* Основний блок */}
      <Box
        sx={{
          width: { xs: 300, md: 384 },
          height: { xs: 300, md: 384 },
          bgcolor: "primary.primary90",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: { xs: 3, md: 6 },
          gap: 0,
        }}
      >
        {/* Заголовок */}
        <Typography
          color="primary.primary30"
          sx={{
            fontSize: { xs: 42, md: 56 },
            fontWeight: 700,
            fontFamily: "'poppins', sans-serif",
            lineHeight: { xs: "42px", md: "56px" },
            letterSpacing: 0,
            textAlign: "left",
          }}
        >
          СТОРІНКА
          <br />
          НЕ ПРАЦЮЄ
        </Typography>
        {/* Пояснення */}
        <Typography
          color="primary.primary30"
          sx={{
            textAlign: "left",
            fontSize: { xs: 16, md: 20 },
            fontWeight: 700,
            fontFamily: "'poppins', sans-serif",
            lineHeight: { md: "20px" },
          }}
        >
          Ми поки не знаємо в чому проблема, <br /> але скоро це пофіксимо
        </Typography>
        {/* 404 */}
        <Typography
          color="primary.primary30"
          sx={{
            width: "100%",
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { xs: 150, md: 200 },
            fontWeight: 700,
            fontFamily: "'poppins', sans-serif",
            lineHeight: 1,
            textAlign: "center",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          404
        </Typography>

        {/* Кнопка */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/HomePage")}
        >
          окак , на головну
        </Button>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: { xs: "0", lg: 720 },
          display: "flex",
          mx: "52px",
        }}
      >
        <Logo
          style={{
            width: "100%",
            objectFit: "cover",
            ...iconColors,
          }}
        />
      </Box>
    </Box>
  );
};

export default NotFound;
