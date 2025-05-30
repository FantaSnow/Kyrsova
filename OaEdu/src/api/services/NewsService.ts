import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class NewsService {
  // Отримати всі новини
  async getAll(skip = 0, limit = 10) {
    return http.get(`/news/get-all?skip=${skip}&limit=${limit}`);
  }

  // Отримати новину за id
  async getById(id: number) {
    return http.get(`/news/get-by-id?id=${id}`);
  }

  // Отримати новини за департаментом
  async getByDepartment(departament_id: number) {
    return http.get(`/news/get-by-departament?departament_id=${departament_id}`);
  }

  // Створити новину (завантаження файлів)
  async create(data: {
    name: string;
    desc: string;
    categ: number;
    depart: number;
    main_image: File;
    gallery_images?: File[];
  }) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("categ", String(data.categ));
    formData.append("depart", String(data.depart));
    formData.append("main_image", data.main_image);
    if (data.gallery_images) {
      data.gallery_images.forEach((file) => formData.append("gallery_images", file));
    }
    return http.post("/news/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Оновити новину
  async update(newsData: any) {
    return http.put("/news/update", newsData);
  }

  // Видалити новину
  async delete(id: number) {
    return http.delete(`/news/delete?id=${id}`);
  }
}

export default new NewsService();