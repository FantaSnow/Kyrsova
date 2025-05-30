import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export interface CardData {
  name: string;
  role: string;
  img: string;
}

interface CardSliderProps {
  cards: CardData[];
}

const getCardStyle = (idx: number) => {
  const theme = useTheme();

  if (Math.abs(idx) === 2)
    return {
      width: 254.38,
      height: 319.76,

      boxShadow: `0px 0px 30px -9px ${theme.palette.secondary.secondary40}`,
      opacity: 0.5,
      transform: "scale(0.8)",
      zIndex: 1,
    };
  if (Math.abs(idx) === 1)
    return {
      width: 326.79,
      height: 410.68,
      boxShadow: `0px 0px 30px -6px ${theme.palette.secondary.secondary40}`,
      opacity: 0.8,
      transform: "scale(0.92)",
      zIndex: 2,
    };
  // center
  return {
    width: 409,
    height: 514,
    boxShadow: `0px 0px 30px -3px ${theme.palette.secondary.secondary40}`,
    opacity: 1,
    transform: "scale(1)",
    zIndex: 3,
  };
};

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [center, setCenter] = useState(0);
  const isNarrow = useMediaQuery("(max-width:1450px)");

  const visibleCount = isNarrow ? 3 : 5;
  const offset = Math.floor(visibleCount / 2);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 6,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {cards.map((card, idx) => {
          const rel = idx - center;
          const isVisible = Math.abs(rel) <= offset;
          return (
            <Box
              key={idx}
              sx={{
                ...(isVisible
                  ? {
                      ...getCardStyle(rel),
                      transition: "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                    }
                  : {
                      opacity: 0,
                      pointerEvents: "none",
                      position: "absolute",
                      // Без transition для невидимих
                    }),
                borderRadius: "50px",
                bgcolor: "secondary.secondary10",
                display: "flex",
                gap: "14px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                overflow: "hidden",
              }}
            >
              <img
                src={card.img}
                alt={card.name}
                style={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                  borderRadius: "16px 16px 0 0",
                }}
              />
              <Typography variant="bodyL" color="text.primary" align="center">
                {card.name}
              </Typography>
              <Typography variant="bodyM" color="text.primary" align="center">
                {card.role}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* Кнопки пагінації */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          margin: "30px 0",
          justifyContent: "center",
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setCenter((c) => Math.max(0, c - 1))}
          disabled={center <= 0}
        >
          ←
        </Button>
        <Button
          variant="contained"
          onClick={() => setCenter((c) => Math.min(cards.length - 1, c + 1))}
          disabled={center >= cards.length - 1}
        >
          →
        </Button>
      </Box>
    </Box>
  );
};

export default CardSlider;
