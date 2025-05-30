import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class ClassNumberService {
  // Отримати всі номери занять (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/classnumber/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати номер заняття за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/classnumber/get?id=${id}`);
  }

  // Створити номер заняття (тільки для адміна)
  async create(classNumberData: any) {
    return http.post("/classnumber/create", classNumberData);
  }

  // Оновити номер заняття (тільки для адміна)
  async update(classNumberData: any) {
    return http.put("/classnumber/update", classNumberData);
  }

  // Видалити номер заняття (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/classnumber/delete?id=${id}`);
  }
}

export default new ClassNumberService();