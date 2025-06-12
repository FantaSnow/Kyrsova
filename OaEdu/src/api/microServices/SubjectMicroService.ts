import { HttpClient } from "../HttpClient";

const http = new HttpClient({});

class SubjectMicroService {
  async loadSubjects(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return http.post("/load-subjects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

}

export default new SubjectMicroService();