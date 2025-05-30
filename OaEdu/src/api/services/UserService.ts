import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class UserService {
  // Реєстрація користувача
  async register(userData: any) {
    return http.post("/users/register", userData);
  }

  // Логін через email+telegram
  async loginViaEmailTelegram(formData: { username: string; password: string }) {
    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", formData.password);
    return http.post("/users/login-via-email-telegram", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }

  // Логін через email
  async loginViaEmail(formData: { username: string; password: string }) {
    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", formData.password);
    return http.post("/users/login-via-email", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }

  // Отримати поточного користувача
  async getMe() {
    return http.get("/users/me");
  }

  // Отримати всіх користувачів (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/users/test-role?skip=${skip}&limit=${limit}`);
  }

  // Оновити пароль
  async updatePassword(data: { id: number; password: string }) {
    return http.put("/users/update-password", data);
  }

  // Забанити користувача (тільки для адміна)
  async banUser(id: number) {
    return http.delete(`/users/ban-user?id=${id}`);
  }

  // Отримати користувача за telegram_id
  async getUserByTelegramId(telegram_id: string) {
    return http.get(`/users/get-user-by-telegram?telegram_id=${telegram_id}`);
  }
}

export default new UserService();