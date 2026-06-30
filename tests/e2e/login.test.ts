import { test, expect } from "@playwright/test";
import variables from "../../config/variables";
import { LoginPage } from "../components/ui/LoginPage";

const { selectedUser } = variables;

test.describe("Login tests", () => {
  test("test", async ({ page, request }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://dojo.upexgalaxy.com/");
    await loginPage.login({
      email: selectedUser.email,
      password: selectedUser.password,
    });
  });
});
