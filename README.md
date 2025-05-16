# OA Edu

**OA Edu** — це сучасний навчальний портал для студентів та викладачів Острозької академії. Проєкт реалізовано на основі React та Material UI з кастомним дизайном, підтримкою світлої/темної теми, авторизацією та адаптивною версткою.

---

## 🚀 Основні можливості

- **Адаптивний інтерфейс** — зручно на будь-якому пристрої.
- **Світла/темна тема** — перемикається в один клік.
- **Авторизація** — захист сторінок через JWT.
- **Сучасний дизайн** — кастомні токени теми, типографіка, кнопки, AppBar.
- **Роутінг** — захищені та публічні сторінки через React Router.
- **Гнучка архітектура** — легко масштабувати та розширювати.

---

## 🛠️ Технології

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI 7](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [JWT](https://jwt.io/)

---

## ⚙️ Структура проєкту

```
src/
  api/                # HTTP-клієнт та сервіси
  components/         # UI-компоненти (Header, Footer, Login, Layout)
  features/           # Фічі (HomePage, інше)
  providers/          # Провайдери (Theme, Auth)
  routes/             # Роутінг
  assets/             # Іконки, зображення
  types/              # Глобальні типи для TS
  App.tsx             # Головний компонент
  main.tsx            # Точка входу
```

---

## 🌗 Темізація

- Власний ThemeProvider на базі MUI.
- Кастомні токени для світлої та темної теми (`src/providers/theme/design-tokens/`).
- Перемикання теми через контекст (див. Header).

---

## 🔐 Авторизація

- Авторизація через JWT (див. `src/api/services/AuthService.ts`).
- Захист роутів через компонент `ProtectedRoute`.
- Зберігання токена у localStorage.

---
