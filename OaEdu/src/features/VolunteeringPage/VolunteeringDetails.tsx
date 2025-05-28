import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import volunteerImg from "../../assets/icons/Edik.png";

const fetchVolunteeringById = async (id: string) => {
  return {
    id,
    title: "Долучайся до волонтерства у пробації у Дубровиці",
    date: "26 травня 2023 – 29 травня 2025",
    location: "Україна, Рівненська область, Дубровиця",
    org: "ГО «Відчую»",
    orgLogo: volunteerImg,
    image: volunteerImg,
    shifts: [
      "10:30 – 13:30 — потрібні 3 волонтери;",
      "13:30 – 16:30 — потрібні 3 волонтери;",
      "16:30 – 19:30 — потрібні 3 волонтери;",
    ],
    description: `ГО «Відчую» запрошує приєднатися до важливої ініціативи з перевірки слуху, яка відбудеться 31 травня на ВДНГ (локація "КИТ"). Це чудова можливість долучитися до соціального проєкту, що змінює життя!`,
    tags: ["Собаки", "Собаки", "Собаки"],
    banner: volunteerImg,
  };
};

const VolunteeringDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVolunteeringById(id).then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h2" color="error">
          Волонтерство не знайдено
        </Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", px: 10 }}>
      <Box
        sx={{
          maxWidth: 1600,
          mx: "auto",
          py: 5,
          px: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Верхній контейнер з заголовком і кнопкою */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}
        >
          <Typography variant="h1" color="text.primary">
            {data.title}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </Box>

        {/* Основний контейнер */}
        <Box
          sx={{
            display: "flex",
            gap: 5,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Ліва частина */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              bgcolor: "secondary.secondary10",
              borderRadius: 4,
              p: 4,
              minWidth: 0,
              boxShadow: "0px 4px 5px 2px #00000024",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4" color="text.primary">
              {data.date}
            </Typography>
            <Typography variant="h4" color="text.primary" sx={{ mb: 2 }}>
              {data.location}
            </Typography>
            {/* Теги */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              {data.tags.map((tag: string, idx: number) => (
                <Button
                  key={idx}
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "primary.primary20",
                    px: 2,
                    minWidth: 80,
                    boxShadow: "none",
                  }}
                >
                  {tag}
                </Button>
              ))}
            </Box>
            <Typography variant="h2" color="text.primary" sx={{ mt: 2, mb: 1 }}>
              Ставай волонтером у пробації
            </Typography>
            <Typography variant="bodyM" color="text.primary" sx={{ mb: 3 }}>
              {data.description}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="h2"
                color="text.primary"
                sx={{
                  mb: 1,
                }}
              >
                Графік роботи поділений на 3 зміни (можна обрати зручну):
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {data.shifts.map((shift: string, idx: number) => (
                  <li key={idx}>
                    <Typography variant="bodyM" color="text.primary">
                      {shift}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>
          {/* Права частина — велике фото */}
          <Paper
            elevation={0}
            sx={{
              minWidth: 520,
              maxWidth: 700,
              width: "40%",
              borderRadius: 4,
              boxShadow: "0px 4px 5px 2px #00000024",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
              overflow: "hidden",
              height: 420,
            }}
          >
            <Box
              component="img"
              src={data.banner}
              alt="banner"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default VolunteeringDetails;
