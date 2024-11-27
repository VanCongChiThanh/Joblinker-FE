import apiClient from "./api";

/**
 * Fetch list jobs
 * @param {Number} page 
 * @param {Number} size 
 * @param {String} filter 
 * @returns {Promise}
 */
export const fetchJobs = async (page = 1, size = 10, filter = "") => {
  try {
    const response = await apiClient.get("/jobs", {
      params: {
        page,
        size,
        filter,
      },
    });
    console.log("API raw response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { content: [] };
  }
};

/**
 * Fetch jobdetails
 * @param {Number} jobId 
 * @returns {Promise} 
 */
export const fetchJobDetails = async (jobId) => {
  try {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return { content: [] };
  }
};
