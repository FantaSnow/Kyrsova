import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class ClassTypeService {
  // Отримати всі типи занять (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/classtypes/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати тип заняття за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/classtypes/get?id=${id}`);
  }

  // Створити тип заняття (тільки для адміна)
  async create(classTypeData: any) {
    return http.post("/classtypes/create", classTypeData);
  }

  // Оновити тип заняття (тільки для адміна)
  async update(classTypeData: any) {
    return http.put("/classtypes/update", classTypeData);
  }

  // Видалити тип заняття (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/classtypes/delete?id=${id}`);
  }
}

export default new ClassTypeService();