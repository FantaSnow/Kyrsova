import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class GeminiFlashService {
  // Згенерувати відповідь на основі профілю користувача та контенту
  async generateResponse(userId: number, content: string) {
    return http.post("/generate-response", { user_id: userId, content });
  }

  // Дати пораду щодо предмету для користувача
  async giveAdvice(userId: number, subjectId: number) {
    return http.post("/give-advice", { user_id: userId, subject_id: subjectId });
  }
}

export default new GeminiFlashService();