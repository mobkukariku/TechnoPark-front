import { getData } from "./axiosInstance";

export const getTags = async () => getData('/tags');

export const getDirections = async () => getData('/directions');
