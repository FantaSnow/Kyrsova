import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class UserDetailService {
  // Отримати профіль користувача за id
  async getById(userId: number) {
    return http.get(`/about-me-by-id?user_id=${userId}`);
  }

  // Отримати профіль користувача за server_id
  async getByServerId(serverId: number) {
    return http.get(`/about-me-by-server-id?server_id=${serverId}`);
  }

  // Створити профіль користувача
  async create(userData: any) {
    return http.post("/create-user-profile", userData);
  }

  // Форматувати профіль користувача
  async formatUser(userId: number) {
    return http.post("/format-user", { user_id: userId });
  }

  // Оновити профіль користувача
  async update(userId: number, userData: any) {
    return http.put(`/update-user-profile?user_id=${userId}`, userData);
  }

  // Видалити профіль користувача
  async delete(userId: number) {
    return http.delete(`/delete-user-profile?user_id=${userId}`);
  }
}

export default new UserDetailService();