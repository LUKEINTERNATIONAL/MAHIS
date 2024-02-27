import { AxiosInstance } from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { emrApiClient } from '@/services/ANC/emr_api_client';

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: any;
  jwt: string;
}

export async function login(
  username: string,
  password: string,
  apiClient: AxiosInstance = emrApiClient()
) {
  const credentials: Credentials = { username, password }; 

  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);

    const jwtToken = response.data.jwt;
    VueCookieNext.setCookie("accessToken", jwtToken);
    localStorage.setItem("accessToken", jwtToken);

    return {
      status: response.status,
      user: response.data.user,
      jwt: jwtToken,
      message: "Login successful"
    };
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
}


  