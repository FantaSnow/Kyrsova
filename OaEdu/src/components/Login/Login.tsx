import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { Box, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginPageImg from "../../assets/icons/LoginPage.png";
// Імпортуй кастомний TextField

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const success = await authLogin(login, password);
      if (success) {
        navigate("/");
      } else {
        setError("Не вдалося увійти. Перевірте логін або пароль.");
      }
    } catch (err) {
      setError("Помилка під час входу. Спробуйте пізніше.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "secondary.secondary10",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: { xs: "0", md: "50vw" },
          height: "80vh",
          minWidth: { md: 400 },
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        <img
          src={LoginPageImg}
          alt="Login"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right",
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography variant="h1" color="text.primary">
            Welcome Back
          </Typography>
          <Typography variant="bodyM" color="text.primary">
            Всі права захищені кабом
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="bodyM" color="text.primary">
                Пошта
              </Typography>
              <TextField
                fullWidth
                placeholder="Введіть свою пошту"
                variant="outlined"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="bodyM" color="text.primary">
                Пароль
              </Typography>
              <TextField
                fullWidth
                placeholder="Введіть свій пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                typography: "buttonL",
              }}
              loading={loading}
            >
              Увійти
            </LoadingButton>
          </Box>
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
