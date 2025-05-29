import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class TeacherService {
  // Отримати всіх викладачів (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/teachers/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук викладачів за ім'ям
  async getByName(name: string) {
    return http.get(`/teachers/get-by-name?name=${encodeURIComponent(name)}`);
  }

  // Отримати викладача за id
  async getById(id: number) {
    return http.get(`/teachers/get?id=${id}`);
  }

  // Створити викладача (тільки для адміна)
  async create(teacherData: any) {
    return http.post("/teachers/create", teacherData);
  }

  // Оновити викладача (тільки для адміна)
  async update(teacherData: any) {
    return http.put("/teachers/update", teacherData);
  }

  // Видалити викладача (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/teachers/delete?id=${id}`);
  }

  // Завантажити викладачів з Excel (тільки для адміна)
  async loadTeachers(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return http.post("/teachers/load-teacher", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new TeacherService();