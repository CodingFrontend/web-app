import baseUrl from "@/api/baseUrl";
import type { LoginApiPayload } from "@/types/LoginApi";

class AuthDataService {
  login(payload: LoginApiPayload): Promise<any> {
    return baseUrl.post("/login", payload);
  }
}

export default new AuthDataService();
