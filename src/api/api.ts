import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:7007/api',
    headers: {
        'Content-Type': 'application/json',
    },
})


export const postRequest = async (name: string, surname: string, email: string, direction: string, message: string) => {
    try {
        const response = await axiosInstance.post('/requests', {
            name, surname, email, direction, message
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
