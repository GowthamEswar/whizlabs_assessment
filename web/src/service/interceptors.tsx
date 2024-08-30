/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Create an instance of Axios
const tokenInstance: AxiosInstance = axios.create(
  {
    baseURL: `${import.meta.env.VITE_BASE_URL}`
  }
);

const chatInstance: AxiosInstance = axios.create(
  {
    baseURL: `${import.meta.env.VITE_SOCKET_URL}`
  }
);

// Request interceptor for the tokenInstance
chatInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Modify request config here, such as adding headers
    const token: any = localStorage.getItem("token")
    config!.headers["Authorization"] = `our_app_secret ${token}`;
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Request interceptor for the tokenInstance
tokenInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Modify request config here, such as adding headers
    const token: any = localStorage.getItem("token")
    config!.headers["Authorization"] = `our_app_secret ${token}`;
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for the tokenInstance
tokenInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data or handle it
    return response;
  },
  (error: AxiosError) => {
    // Handle response error
    return Promise.reject(error);
  }
);

// Create another instance of Axios
const authInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// Request interceptor for the authInstance
authInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Modify request config for this instance
    // ...
    return config;
  },
  (error: AxiosError) => {
    // Handle request error for this instance
    return Promise.reject(error);
  }
);

// Response interceptor for the authInstance
authInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data or handle it for this instance
    return response;
  },
  (error: AxiosError) => {
    // Handle response error for this instance
    return Promise.reject(error);
  }
);

// Create an instance of Axios
const productInstance: AxiosInstance = axios.create(
  {
    baseURL: `${import.meta.env.VITE_PRODUCT_URL}`
  }
);

// Request interceptor for the tokenInstance
productInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Modify request config here, such as adding headers
    const token: any = localStorage.getItem("token")
    config!.headers["Authorization"] = `our_app_secret ${token}`;
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export { tokenInstance, authInstance, chatInstance, productInstance };
