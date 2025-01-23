import apiClient from "./api";

export const uploadFile = async (file, folder) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await apiClient.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const fileName = response.data.data.fileName;
    return fileName;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
