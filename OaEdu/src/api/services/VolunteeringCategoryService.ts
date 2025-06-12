import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class VolunteeringCategoryService {
  // Отримати всі категорії волонтерства (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/volunteering-category/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук категорії за ім'ям
  async getByName(name: string) {
    return http.get(`/volunteering-category/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Отримати категорію за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/volunteering-category/get?id=${id}`);
  }

  // Створити категорію (тільки для адміна)
  async create(categoryData: any) {
    return http.post("/volunteering-category/create", categoryData);
  }

  // Оновити категорію (тільки для адміна)
  async update(categoryData: any) {
    return http.put("/volunteering-category/update", categoryData);
  }

  // Видалити категорію (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/volunteering-category/delete?id=${id}`);
  }
}

export default new VolunteeringCategoryService();