import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { useTheme } from "../../providers/theme/ThemeProvider";
import "../../css/AuthTile.css";

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
    <div
      className="login-page"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="form">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.primary.main}`,
              borderRadius: theme.components.mui.button.root.borderRadius,
              padding: "10px",
            }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.primary.main}`,
              borderRadius: theme.components.mui.button.root.borderRadius,
              padding: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.text,
              borderRadius: theme.components.mui.button.root.borderRadius,
              padding: "10px",
              textTransform: theme.components.mui.button.root.textTransform as
                | "none"
                | "capitalize"
                | "uppercase"
                | "lowercase"
                | "inherit", // Явне приведення типу
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Увійти
          </button>
          {error && <p style={{ color: theme.colors.error.main }}>{error}</p>}
          <p className="message">
            Ще не зареєстровані? <a href="/register">Створити акаунт</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
