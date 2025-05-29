import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class GroupService {
  // Отримати всі групи
  async getAll(skip = 0, limit = 10) {
    return http.get(`/groups/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук групи за ім'ям
  async getByName(name: string) {
    return http.get(`/groups/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Отримати групи за спеціальністю
  async getBySpecialty(specialty_id: number) {
    return http.get(`/groups/get-by-specialty?specialty_id=${specialty_id}`);
  }

  // Отримати групу за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/groups/get?id=${id}`);
  }

  // Створити групу (тільки для адміна)
  async create(groupData: any) {
    return http.post("/groups/create", groupData);
  }

  // Оновити групу (тільки для адміна)
  async update(groupData: any) {
    return http.put("/groups/update", groupData);
  }

  // Видалити групу (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/groups/delete?id=${id}`);
  }
}

export default new GroupService();