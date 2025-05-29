import { jwtDecode } from "jwt-decode";
import { HttpClient } from "../HttpClient";

class AuthService {
  private static tokenKey = "token";
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({ baseURL: import.meta.env.REACT_APP_API_URL });
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await this.httpClient.post<{ access_token: string }>(
        "/users/login-via-email",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const token = response.access_token;
      localStorage.setItem(AuthService.tokenKey, token);
      console.log("Token stored in local storage:", token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(AuthService.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey);
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: { userid: string } = jwtDecode(token);
    return decodedToken.userid;
  }
}

export default new AuthService();
