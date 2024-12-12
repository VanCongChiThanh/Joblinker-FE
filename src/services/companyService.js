
import apiClient from "./api";

export const fetchCompanies = async (page = 1, size = 10, filter = "") => {
  try {
    const response = await apiClient.get("/companies", {
      params: {
        page,
        size,
        filter,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error; 
  }
};

