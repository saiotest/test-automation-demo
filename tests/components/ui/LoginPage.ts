import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page; // guarda el "control remoto"
  }

  async login(args: { email: string; password: string }) {
    await this.page.getByTestId("nav-login-link").click();
    await this.page.getByTestId("login-email-input").click();
    await this.page.getByTestId("login-email-input").fill(args.email);
    await this.page.getByTestId("login-password-input").click();
    await this.page.getByTestId("login-password-input").fill(args.password);
    await this.page.getByTestId("login-submit-button").click();
  }
}
