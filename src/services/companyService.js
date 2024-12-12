
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
export const fetchTopCompanies = async () => {
  try {
    const response = await apiClient.get("/companies/top-companies");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};
