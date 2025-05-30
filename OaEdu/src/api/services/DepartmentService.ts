import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class DepartmentService {
  // Отримати всі кафедри (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/departments/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати кафедру за id
  async getById(id: number) {
    return http.get(`/departments/get?id=${id}`);
  }

  // Створити кафедру (тільки для адміна)
  async create(departmentData: any) {
    return http.post("/departments/create", departmentData);
  }

  // Оновити кафедру (тільки для адміна)
  async update(departmentData: any) {
    return http.put("/departments/update", departmentData);
  }

  // Видалити кафедру (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/departments/delete?id=${id}`);
  }
}

export default new DepartmentService();