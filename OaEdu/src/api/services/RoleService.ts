import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class RoleService {
  // Отримати всі ролі (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/roles/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати роль за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/roles/get?id=${id}`);
  }

  // Отримати роль за ім'ям (тільки для адміна)
  async getByName(name: string) {
    return http.get(`/roles/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Створити роль (тільки для адміна)
  async create(roleData: any) {
    return http.post("/roles/create", roleData);
  }

  // Оновити роль (тільки для адміна)
  async update(roleData: any) {
    return http.put("/roles/update", roleData);
  }

  // Видалити роль (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/roles/delete?id=${id}`);
  }
}

export default new RoleService();