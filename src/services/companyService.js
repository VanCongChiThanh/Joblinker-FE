
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
export const fetchCompanyByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/companies/by-user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching company for user ID ${userId}:`, error);
    throw error;
  }
};
/**
 * Service để cập nhật thông tin công ty.
 * 
 * @param {number} companyId
 * @param {Object} updatedData 
 * @returns {Promise<Object>} 
 */
export const updateCompany = async (companyId, updatedData) => {
  try {
    const response = await apiClient.put(`/companies/${companyId}`, updatedData);
    return response.data.data; 
  } catch (error) {
    console.error(`Error updating company with ID ${companyId}:`, error);
    throw error;
  }
};
