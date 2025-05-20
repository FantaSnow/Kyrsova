import React from "react";
import { Box, Typography } from "@mui/material";
import HomePageImg from "../../assets/icons/HomePage.png";
import Edik from "../../assets/icons/Edik.png";

import CardSlider from "./CardSlider";
import ReviewSlider from "./ReviewSlider";

const HomePage: React.FC = () => {
  const cards = [
    {
      name: "Строзюк Роман",
      role: "UX/UI дизайнер",
      img: Edik,
    },
    {
      name: "Бурчак Петро",
      role: "DevOps інженер",
      img: Edik,
    },
    {
      name: "Нестерчук Віталій",
      role: "Мобільний розробник",
      img: Edik,
    },
    {
      name: "Тарасюк Дмитро",
      role: "Фронтенд розробник",
      img: Edik,
    },
    {
      name: "Довгий Данило",
      role: "Бекенд розробник",
      img: Edik,
    },
    {
      name: "Качмарський Данило",
      role: "QA тестувальник",
      img: Edik,
    },
  ];

  const reviews = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
      author: "Ольга Кривицька",
      role: "головний торчок академії",
    },
    {
      text: "Дуже класний університет! Рекомендую всім.",
      author: "Іван Петренко",
      role: "студент",
    },
    {
      text: "Тут я знайшов справжніх друзів і отримав якісну освіту.",
      author: "Марія Іванова",
      role: "випускниця",
    },
    {
      text: "Викладачі завжди допомагають і підтримують.",
      author: "Олександр Коваль",
      role: "студент",
    },
  ];

  return (
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
      {/* TOP CONTENT */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
          mx: { xs: "10vw", lg: "5vw", xl: "10vw" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "60%" },
            height: "100%",
            paddingTop: "40px",
          }}
        >
          <Typography variant="h1" color="text.primary">
            Острозька академія - це традиція що творить майбутнє
          </Typography>
          <Typography variant="bodyL" color="text.primary">
            «Від ренесансних класів до сучасних аудиторій 450 років просвіти, що
            надихає змінювати світ»
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", lg: "40%" },
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={HomePageImg}
            style={{
              margin: "40px 0px",
              height: "300px",
              width: "auto",
              objectFit: "cover",
              display: "block",
            }}
            alt="HomePage"
          />
        </Box>
      </Box>
      {/* CENTER CONTENT */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "40px 0px",
        }}
      >
        <CardSlider cards={cards} />
      </Box>
      {/* BOTTOM CONTENT */}
      <ReviewSlider reviews={reviews} />
    </Box>
  );
};

export default HomePage;
