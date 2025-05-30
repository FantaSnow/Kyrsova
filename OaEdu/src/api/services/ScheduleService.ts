import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class ScheduleService {
  // Отримати всі розклади (тільки для адміна)
  async getAll(skip = 0, limit = 10) {
    return http.get(`/schedule/get-all?skip=${skip}&limit=${limit}`);
  }

  // Пошук за назвою предмета (для групи, з датами)
  async getBySubjectName(
    name: string,
    group_id: number,
    date_start?: string,
    date_end?: string
  ) {
    let url = `/schedule/get-by-subject-name?name=${encodeURIComponent(name)}&group_id=${group_id}`;
    if (date_start) url += `&date_start=${date_start}`;
    if (date_end) url += `&date_end=${date_end}`;
    return http.get(url);
  }

  // Отримати розклад за id (тільки для адміна)
  async getById(id: number) {
    return http.get(`/schedule/get?id=${id}`);
  }

  // Отримати розклади за датами (PUT)
  async getByDates(date_start?: string, date_end?: string) {
    return http.put("/schedule/get-by-date-start-end", undefined, {
      params: { date_start, date_end },
    });
  }

  // Отримати розклади за групою (PUT)
  async getByGroup(date_start?: string, date_end?: string) {
    return http.put("/schedule/get_by-group", undefined, {
      params: { date_start, date_end },
    });
  }

  // Створити розклад (тільки для адміна)
  async create(scheduleData: any) {
    return http.post("/schedule/create", scheduleData);
  }

  // Оновити розклад (тільки для адміна)
  async update(scheduleData: any) {
    return http.put("/schedule/update", scheduleData);
  }

  // Видалити розклад (тільки для адміна)
  async delete(id: number) {
    return http.delete(`/schedule/delete?id=${id}`);
  }
}

export default new ScheduleService();