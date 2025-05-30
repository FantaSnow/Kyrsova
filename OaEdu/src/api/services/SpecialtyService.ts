import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class SpecialtyService {
  // Отримати всі спеціальності
  async getAll(skip = 0, limit = 10) {
    return http.get(`/specialty/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук спеціальності за ім'ям
  async getByName(name: string) {
    return http.get(`/specialty/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Отримати спеціальність за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/specialty/get?id=${id}`);
  }

  // Створити спеціальність (тільки для адміна)
  async create(specialtyData: any) {
    return http.post("/specialty/create", specialtyData);
  }

  // Оновити спеціальність (тільки для адміна)
  async update(specialtyData: any) {
    return http.put("/specialty/update", specialtyData);
  }

  // Видалити спеціальність (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/specialty/delete?id=${id}`);
  }
}

export default new SpecialtyService();