import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class SubjectService {
  // Отримати всі предмети (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/subject/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук предмета за ім'ям
  async getByName(name: string) {
    return http.get(`/subject/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Отримати предмет за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/subject/get?id=${id}`);
  }

  // Створити предмет (тільки для адміна)
  async create(subjectData: any) {
    return http.post("/subject/create", subjectData);
  }

  // Оновити предмет (тільки для адміна)
  async update(subjectData: any) {
    return http.put("/subject/update", subjectData);
  }

  // Видалити предмет (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/subject/delete?id=${id}`);
  }
}

export default new SubjectService();