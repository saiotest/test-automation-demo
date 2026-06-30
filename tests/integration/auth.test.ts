import { test, expect } from "@playwright/test";
import variables from "../../config/variables";
import { AuthApi } from "../components/api/AuthApi";

test.describe("Auth tests", () => {
  test("API auth/login Should return 400 with bad credentials", async ({
    request,
  }) => {
    const authApi = new AuthApi(request);

    const { authResponse, status, response } = await authApi.apiLogin({
      email: "asdsadsadas",
      password: "asdasdasdasdas",
    });

    console.log(authResponse);
    console.log(status);

    await expect.soft(response).not.toBeOK();
    expect.soft(status).toBe(400);
    expect.soft(authResponse.access_token).toBeUndefined();
  });

  test("API auth/login Should return 200 with correct credentials", async ({
    request,
  }) => {
    const authApi = new AuthApi(request);

    await authApi.apiLoginSuccessfully();
    const { currentUserResponse } = await authApi.apiGetCurrentUser();

    console.log(currentUserResponse);
  });
});
