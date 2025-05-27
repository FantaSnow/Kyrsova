import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const topNews = {
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  title:
    "Lorem Ipsum is sim1231123123123123ply dummy text of the printing and typesetting industry.",
  description:
    "Lorem Ipsum has b1231een the industry's standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
};

const smallNews = [
  {
    image: topNews.image,
    title: "when an unknown printer took a galley of type and scrambled...",
  },
  {
    image: topNews.image,
    title: "when an unknown printer took a galley of type and scrambled...",
  },
  {
    image: topNews.image,
    title: "when an unknown printer took a galley of type and scrambled...",
  },
  {
    image: topNews.image,
    title: "when an unknown printer took a galley of type and scrambled...",
  },
  {
    image: topNews.image,
    title: "when an unknown printer took a galley of type and scrambled...",
  },
];

const listNews = [
  {
    image: topNews.image,
    title: "Новина про подію",
    description:
      "Короткий опис новини або анонс. Можна підставити будь-який текст з бекенду.",
    meta: "2 хвилини тому",
  },
  {
    image: topNews.image,
    title: "Ще одна новина",
    description:
      "Ще один короткий опис новини для поткий опис новини для приклоткий опис новини для приклоткий опис новини для приклоткий опис новини для приклоткий опис новини для приклоткий опис новини для приклоткий опис новини для приклрикладу.",
    meta: "5 хвилин тому",
  },
  {
    image: topNews.image,
    title: "Третя новина",
    description: "Опис третьої новини. Тут може бути будь-який текст.",
    meta: "6 хвилин тому",
  },
];

const ScienceNews: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: 3 }}>
      {/* Top news block */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box sx={{ flex: 2, borderRadius: 3, overflow: "hidden" }}>
          <img
            src={topNews.image}
            alt="main"
            style={{
              width: "100%",
              height: 374,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1.2,
            bgcolor: "secondary.secondary20",
            borderRadius: 3,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            color="text.primary"
            gutterBottom
            sx={{
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topNews.title}
          </Typography>
          <Typography
            variant="bodyS"
            color="text.primary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 7,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topNews.description}
          </Typography>
          <Button
            variant="text"
            sx={{
              alignSelf: "flex-start",
              px: 0,
              color: theme.palette.text.primary,
              ...theme.typography.h4,
            }}
            onClick={() => navigate(`/news/science/top`, { state: topNews })}
          >
            Читати більше
          </Button>
        </Box>
      </Box>
      {/* Small news grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          mb: 4,
        }}
      >
        {smallNews.map((news, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "left",
              width: "19%",
              cursor: "pointer",
              transition: "box-shadow 0.2s, background 0.2s",
              "&:hover": {
                "& .small-news-title": {
                  textDecoration: "underline",
                },
              },
            }}
            onClick={() =>
              navigate(`/news/science/small-${i}`, { state: news })
            }
          >
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                mb: 1,
                height: 120,
                width: "100%",
              }}
            >
              <img
                src={news.image}
                alt={`news-${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
            <Typography
              variant="bodyS"
              color="text.primary"
              className="small-news-title"
              sx={{ transition: "text-decoration 0.2s" }}
            >
              {news.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* List news blocks */}
      {listNews.map((news, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            alignItems: "flex-start",
            cursor: "pointer",
            transition: "box-shadow 0.2s, background 0.2s",
            boxShadow: 1,
            borderRadius: 3,
            "&:hover": {
              boxShadow: 6,
              background: theme.palette.action.hover,
            },
          }}
          onClick={() => navigate(`/news/science/${i}`, { state: news })}
        >
          <Box
            sx={{
              width: "40%",
              minWidth: 220,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={news.image}
              alt={`list-news-${i}`}
              style={{
                width: "100%",
                height: 245,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
          <Box sx={{ flex: 1, flexDirection: "column", display: "flex" }}>
            <Typography
              variant="bodyM"
              color="text.primary"
              gutterBottom
              noWrap
              sx={{ mt: 1.5 }}
            >
              {news.title}
            </Typography>
            <Typography
              variant="bodyS"
              color="text.primary"
              sx={{
                mb: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {news.description}
            </Typography>
            <Typography variant="caption" color="text.primary">
              {news.meta}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ScienceNews;
