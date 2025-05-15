import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { useTheme } from "../../providers/theme/ThemeProvider";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(4),
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: theme.spacing(2),
            textAlign: "center",
          }}
        >
          Вхід
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Логін"
            variant="outlined"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            sx={{
              marginBottom: theme.spacing(2),
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
              },
            }}
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: theme.spacing(2),
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: theme.colors.primary.primary50,
              color: theme.colors.secondary.secondary5,
              borderRadius: theme.components.mui.button.big.borderRadius,
              padding: theme.spacing(2),
              "&:hover": {
                backgroundColor: theme.colors.primary.primary60,
              },
            }}
          >
            Увійти
          </Button>
          {error && (
            <Typography
              variant="body2"
              sx={{
                color: theme.colors.error.error,
                marginTop: theme.spacing(2),
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
