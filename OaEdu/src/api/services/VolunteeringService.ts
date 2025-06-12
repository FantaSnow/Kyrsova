import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class VolunteeringService {
  // Отримати всі волонтерства
  async getAll(skip = 0, limit = 10) {
    return http.get(`/volunteering/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати волонтерство за id
  async getById(id: number) {
    return http.get(`/volunteering/get?id=${id}`);
  }

  // Пошук волонтерства за назвою
  async getByTitle(title: string) {
    return http.get(`/volunteering/get-by-title?title=${encodeURIComponent(title)}`);
  }

  // Створити волонтерство
  async create(volData: any) {
    return http.post("/volunteering/create", volData);
  }

  // Оновити волонтерство
  async update(volData: any) {
    return http.put("/volunteering/update", volData);
  }

  // Видалити волонтерство
  async delete(id: number) {
    return http.delete(`/volunteering/delete?id=${id}`);
  }
}

export default new VolunteeringService();