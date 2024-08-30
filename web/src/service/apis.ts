/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import axios from "axios";
import Toast from "../components/Toast";
import { authInstance, tokenInstance, chatInstance, productInstance } from "./interceptors";

// const baseUrl = import.meta.env.VITE_BASE_URL

export async function getApi(path: string) {
  try {
    const response = await tokenInstance.get(path);

    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function postApi(path: string, payload: any) {
  try {
    const response = await tokenInstance.post(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function putApi(path: string, payload: any) {
  try {
    const response = await tokenInstance.put(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function deleteApi(path: string, payload: any) {
  try {
    const response = await tokenInstance.delete(path, { data: payload });
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function getEcomApi(path: string) {
  try {
    const response = await  productInstance.get(path);

    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function postEcomApi(path: string, payload: any) {
  try {
    const response = await  productInstance.post(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function putEcomApi(path: string, payload: any) {
  try {
    const response = await  productInstance.put(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function deleteEcomApi(path: string) {
  try {
    const response = await  productInstance.delete(path);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function deleteEcomPayloadApi(path: string, payload: any) {
  try {
    const response = await  productInstance.delete(path, { data: payload });
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function getAuthApi(path: string) {
  try {
    const response = await authInstance.get(path);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function postAuthApi(path: string, payload: any) {
  try {
    const response = await authInstance.post(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response.data.msg);
  }
}

export async function putAuthApi(path: string, payload: any) {
  try {
    const response = await authInstance.put(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response.data.msg);
  }
}

export async function deleteAuthApi(path: string, payload: any) {
  try {
    const response = await authInstance.delete(path, { data: payload });
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response.data.msg);
  }
}

export async function getChatApi(path: string) {
  try {
    const response = await chatInstance.get(path);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function getChatStatusApi(path: string) {
  try {
    const response = await chatInstance.get(path);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function getChatListApi(path: string) {
  try {
    const response = await chatInstance.get(path);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response?.data?.msg);
  }
}

export async function postChatApi(path: string, payload: any) {
  try {
    const response = await chatInstance.post(path, payload);
    return response?.data;
  } catch (err: any) {
    Toast("error", err.response.data.msg);
  }
}

export const getPdfRequest = async (path: string, headerData = {} ) => {
  try {
    const response = await authInstance.get(path,  { headers:headerData, responseType: "blob" });
    return response;
  } catch (err: any) {
    const newErr = JSON.parse(await err.response.data.text())
        Toast("error", newErr.msg);
  }
};
