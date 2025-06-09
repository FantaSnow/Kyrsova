import React from "react";
import { Box, Typography } from "@mui/material";
import HomePageImg from "../../assets/icons/HomePage.png";
import RomaImg from "../../assets/icons/Roma.jpg";
import DanyaImg from "../../assets/icons/Danya.jpg";
import DanyaKImg from "../../assets/icons/DanyaK.jpg";
import EdikImg from "../../assets/icons/Edik.jpg";
import DmytroImg from "../../assets/icons/Dmytro.jpg";
import PetyaImg from "../../assets/icons/petya.jpg";

import CardSlider from "./CardSlider";
import ReviewSlider from "./ReviewSlider";

const HomePage: React.FC = () => {
  const cards = [
    {
      name: "Строзюк Роман",
      role: "UX/UI дизайнер",
      img: RomaImg,
    },
    {
      name: "Бурчак Петро",
      role: "DevOps інженер",
      img: PetyaImg,
    },
    {
      name: "Нестерчук Віталій",
      role: "Мобільний розробник",
      img: EdikImg,
    },
    {
      name: "Тарасюк Дмитро",
      role: "Фронтенд розробник",
      img: DmytroImg,
    },
    {
      name: "Довгий Данило",
      role: "Бекенд розробник",
      img: DanyaImg,
    },
    {
      name: "Качмарський Данило",
      role: "QA тестувальник",
      img: DanyaKImg,
    },
  ];

  const reviews = [
    {
      text: "Освіта — це не лише знання, а й натхнення змінювати світ на краще.",
      author: "Проф. Андрій Мельник",
      role: "декан факультету гуманітарних наук",
    },
    {
      text: "У стінах академії кожен студент — це майбутній лідер, якого ми допомагаємо розкрити.",
      author: "Олена Василенко",
      role: "доцент кафедри менеджменту",
    },
    {
      text: "Найбільша цінність університету — це люди, які тут навчаються і працюють.",
      author: "Віктор Гнатюк",
      role: "професор історії",
    },
    {
      text: "Ми не просто навчаємо — ми надихаємо на великі звершення.",
      author: "Світлана Ковальчук",
      role: "завідувачка кафедри філології",
    },
    {
      text: "Справжня освіта починається там, де закінчуються підручники.",
      author: "Ігор Тарасенко",
      role: "старший викладач інформатики",
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
            Острозька академія — твій старт у світ можливостей
          </Typography>
          <Typography variant="bodyL" color="text.primary" sx={{ mt: 4 }}>
            Вже понад 450 років Острозька академія поєднує глибокі традиції з
            сучасними підходами до освіти. Тут народжуються ідеї, що змінюють
            Україну та світ, а кожен студент отримує не лише знання, а й
            натхнення творити майбутнє.
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
