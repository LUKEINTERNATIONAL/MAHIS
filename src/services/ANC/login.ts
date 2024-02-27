import { login } from "./httpServices";
import { AxiosInstance } from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { emrApiClient } from  "./emr_api_client";

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: any;
  jwt: string;
}

export async function authenticate(credentials: Credentials, apiClient: AxiosInstance = emrApiClient()): Promise<LoginResponse> {
  try {
   
    const response = await login(credentials.username, credentials.password, apiClient);

    VueCookieNext.setCookie("accessToken", response.jwt);
    localStorage.setItem("accessToken", response.jwt);

    return response;
  } catch (error) {
  
    console.error(error);
    throw error;
  }
}
