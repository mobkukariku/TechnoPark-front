import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:7007/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
})

export interface GetNewsParams {
    tags?: string;
    search?: string;
    sort?: string;
    data?: string | null;
    page?: number;
    limit?: number;
}


export const postRequest = async (name: string, surname: string, email: string, direction: string, message: string) => {
    try {
        const response = await axiosInstance.post('/requests', {
            name, surname, email, direction, message
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: email,
            password: password
        },);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async () => {
    try{
        const response = await axiosInstance.get('/profile');
        return response.data.user;
    }catch(error){
        throw error;
    }
}

export const logout = async () => {
    try{
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    }
    catch(error){
        throw error;
    }
}


export const getNews = async (params:GetNewsParams= {}) => {
    try{
        const response = await axiosInstance.get('/news', {params});

        return response.data;
    }catch(error){
        throw error;
    }
}

export const postNews = async (
    title: string,
    content: string,
    imageFile: File | null,
    tags: string,
) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        formData.append("tags", tags);

        const response = await axiosInstance.post('/news', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteNews = async (id: string) => {
    try{
        const response = await axiosInstance.delete(`/news/${id}`);
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const getNewsByID = async (id: string | Array<string> | undefined) => {
    try{
        const response = await axiosInstance.get(`/news/${id}`);
        return response.data.news;
    }catch(error){
        throw error;
    }
}