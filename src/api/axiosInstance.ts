import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
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

export const postData = async <T>(url: string, body?: object, isFormData = false): Promise<T> => {
    const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await axiosInstance.post(url, body, { headers });
    return response.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete(url);
    return response.data;
};

export const patchData = async <T>(url: string, body?: object | FormData, isFormData = false): Promise<T> => {
    const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await axiosInstance.patch(url, body, { headers });
    return response.data;
};
