import { expect, type APIRequestContext, type Expect } from "@playwright/test";
import variables from "@/config/variables";

export class ApiBase {
  request: APIRequestContext;
  accessToken: string | undefined;
  bearerToken: string;
  headers: { [key: string]: string };
  expect: Expect;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.accessToken = undefined;
    this.bearerToken = `Bearer ${this.accessToken}`;
    this.headers = { "Content-Type": "application/json" };
    this.expect = expect;
  }

  // METODOS HTTPS y UTILIDADES de API Testing (reutilizar en otros modulos)

  async apiPost(endpoint: string, requestData: any, options?: any) {
    const url = variables.baseUrl + endpoint; // "/api/auth/register"
    if (this.accessToken) {
      this.headers.Authorization = `Bearer ${this.accessToken}`;
    }
    const response = await this.request.post(url, {
      data: requestData,
      headers: this.headers,
      ...options,
    });
    const body = await response.json();
    const status = response.status();
    return { response, body, status };
  }

  async apiGet(endpoint: string, options?: any) {
    const url = variables.baseUrl + endpoint; // "/api/auth/register"
    if (this.accessToken) {
      this.headers.Authorization = `Bearer ${this.accessToken}`;
    }
    const response = await this.request.get(url, {
      headers: this.headers,
      ...options,
    });
    const status = response.status();
    const text = await response.text();
    const body = await response.json();
    return { response, body, status };
  }
}
