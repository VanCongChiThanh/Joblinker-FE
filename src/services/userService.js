import apiClient from "./api";
/**
 * Fetch user by ID
 * @param {number | string} userId 
 * @returns {Promise<Object>}
 * @throws {Error} 
 */
export const fetchUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error('Failed to fetch user');
  }
};
export const updateProfile = async (userId, user) => {
     try {
       const response = await apiClient.put(`/users/${userId}`,user);
       return response.data.data;
     } catch (error) {
       console.error(`Error updating user with ID ${userId}:`, error);
       throw new Error("Failed to update user");
     }
};