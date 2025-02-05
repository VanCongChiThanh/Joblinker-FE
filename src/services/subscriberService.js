import apiClient from "./api";
export const createSubscriber = async (data) => {
  try {
    const response = await apiClient.post("/subscribers", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume");
  }
};
export const fetchSubscriberSkillsByUser = async () => {
  try {
    const response = await apiClient.post(`/subscribers/skills`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};
export const updateSubscriber = async (id, data) => {
  try {
    const response = await apiClient.put(`/subscribers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating subscriber:", error);
    throw new Error("Failed to update subscriber");
  }
};

export const deleteSubscriber = async (id) => {
  try {
    await apiClient.delete(`/subscribers/${id}`);
    return { message: "Subscriber deleted successfully" }; 
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    throw new Error("Failed to delete subscriber");
  }
};