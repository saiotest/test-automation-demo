import type { APIRequestContext } from "@playwright/test";
import { ApiBase } from "./ApiBase";
import variables from "@/config/variables";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface CurrentUserResponse {
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class AuthApi extends ApiBase {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // ENDPOINTS Y ACCIONES:

  async apiLogin(args: { email: string; password: string }) {
    const { response, body, status } = await this.apiPost(
      "/api/auth/login",
      args,
    );
    const authResponse = body as AuthResponse; // CONTRATO -- Contract Testing
    return { authResponse, status, response };
  }

  async apiLoginSuccessfully() {
    const { authResponse, status, response } = await this.apiLogin(
      variables.selectedUser,
    );
    this.expect.soft(response.ok()).toBeTruthy();
    this.expect.soft(status).toBe(200);
    this.expect(authResponse.access_token).toBeDefined();
    this.accessToken = authResponse.access_token;

    return { authResponse, status, response };
  }

  async apiGetCurrentUser() {
    const { response, body, status } = await this.apiGet("/api/auth/me");

    const currentUserResponse = body as CurrentUserResponse;
    return { currentUserResponse, status, response };
  }
}
