import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const timeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

export const axiosInstance = axios.create({
  baseURL,
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getData = async <T>(url: string, params?: object): Promise<T> => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
};

export const postData = async <T>(
  url: string,
  body?: object | FormData,
  isFormData = false
): Promise<T> => {
  try {
    const headers = isFormData ? {} : { "Content-Type": "application/json" };
    const response = await axiosInstance.post(url, body, { headers });
    return response.data;
  } catch (error) {
    // Import AxiosError and type-check the error
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server error details:", error.response.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const deleteData = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const patchData = async <T>(
  url: string,
  body?: object | FormData,
  isFormData = false
): Promise<T> => {
  const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};
  const response = await axiosInstance.patch(url, body, { headers });
  return response.data;
};
