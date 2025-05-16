import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { Box, TextField, Typography, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
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
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              sx={{ padding: 1.5 }}
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
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
