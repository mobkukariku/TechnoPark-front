import { getData, postData, deleteData, patchData } from "./axiosInstance";
import { GetDataParams } from "@/api/dataParams";
import { NewsData } from "@/store/useNewsStore";

export const getNews = async (params: GetDataParams = {}) =>
  getData("/news", params);

export const getNewsByID = async (id: string | Array<string> | undefined) =>
  getData(`/news/${id}`);

export const getLastNews = async (id: string | Array<string> | undefined) =>
  getData(`/news/lastnews/${id}`);

export const deleteNews = async (id: string) => deleteData(`/news/${id}`);

export const updateNews = async (id: string, data: Partial<NewsData>) =>
  patchData(`/news/${id}`, data, true);

export const postNews = async (
  title: string,
  content: string,
  imageFile: File | null,
  tags: string[] | string
): Promise<NewsData> => {
  // Create FormData for the request
  const formData = new FormData();

  // Add basic fields
  formData.append("title", title);
  formData.append("content", content);
  formData.append("authorId", "current-user-id"); // Replace with actual user ID

  // Add image if available
  if (imageFile) {
    formData.append("image", imageFile);
  }

  // Process tags - ensure it's always an array
  const tagArray = Array.isArray(tags)
    ? tags
    : tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  // Add each tag individually with the same field name
  // This is how FormData properly handles arrays for server-side processing
  tagArray.forEach((tag) => {
    formData.append("tagIds", tag);
  });

  // Log form data for debugging
  console.log("Sending form data with fields:");
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  // Send as FormData
  return postData("/news", formData, true) as Promise<NewsData>;
};
