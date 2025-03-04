import { postData } from "@/api/axiosInstance";

export const postRequest = async (firstName: string, lastName: string, email: string, direction: string, message: string) => {
    return postData("/requests", {
        name: `${firstName} ${lastName}`,
        email,
        direction,
        message,
    });
};
