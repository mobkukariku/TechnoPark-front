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

// Fixed postNews with proper types
export const postNews = async (
  title: string,
  content: string,
  imageFile: File | null,
  tags: string[] | string
): Promise<NewsData> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  // Handle tags whether they're an array or string
  if (Array.isArray(tags)) {
    // Use the correct field name 'tagIds' instead of 'tagIds[]'
    tags.forEach((tag) => {
      if (tag && tag.trim() !== "") {
        formData.append("tagIds", tag.trim());
      }
    });
  } else if (typeof tags === "string") {
    // If it's a string, split and append each tag
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    tagArray.forEach((tag) => {
      formData.append("tagIds", tag);
    });
  }

  // Add console logs to debug what's being sent
  console.log("Sending news data:", {
    title,
    contentLength: content.length,
    imageFile: imageFile?.name,
    tags,
  });

  return postData("/news", formData, true) as Promise<NewsData>;
};
