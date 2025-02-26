import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
})

export interface GetDataParams {
    tags?: string;
    search?: string;
    sort?: string;
    data?: string | null;
    page?: number;
    limit?: number;
    direction?: string;
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


export const getNews = async (params:GetDataParams= {}) => {
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
        return response.data;
    }catch(error){
        throw error;
    }
}


export const getLastNews = async (id: string | string[] | undefined) => {
    try {
        const response = await axiosInstance.get(`/news/sidebar`, {
            params: { exceptId: id }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};


export const getMembersforAdmins = async (params:string) => {
    try{
        const response = await axiosInstance.get('/members/all', {
            params: { search: params }
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getMembersForUsers = async (params:string) => {
    try{
        const response = await axiosInstance.get('/members', {
            params: { search: params }
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getProjects =  async (params:GetDataParams = {}) => {
    try{
        const response = await axiosInstance.get('/projects', {params})
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getTags = async () => {
    try{
        const response = await axiosInstance.get('/tags')
        return response.data;
    }catch (error){
        throw error;
    }
}

export const getDirections = async () => {
    try{
        const response = await axiosInstance.get('/directions')
        return response.data;
    }catch (error){
        throw error;
    }
}