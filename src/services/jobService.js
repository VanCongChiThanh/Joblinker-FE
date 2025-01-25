import apiClient from "./api";

/**
 * Fetch list of jobs with pagination and filtering.
 * @param {Number} page - The page number to retrieve.
 * @param {Number} size - The number of jobs per page.
 * @param {String} filter - The filter criteria for job search.
 * @returns {Promise<Object>} - The response data containing job listings.
 */
export const fetchJobs = async (
  page = 1,
  size = 10,
  filter = "",
  location = ""
) => {
  try {
    const filterCriteria = [`active=true`];
    if (filter) {
      filterCriteria.push(`name~'${filter}'`);
    }
    if (location) {
      filterCriteria.push(`location~'${location}'`);
    }

    const combinedFilter = filterCriteria.join(" AND "); 

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      filter: combinedFilter,
    });

    const response = await apiClient.get(`/jobs?${params.toString()}`);

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
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return { content: [] };
  }
};
export const fetchTopJobs = async () => {
  try {
    const response = await apiClient.get(`/jobs/top-jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};
export const fetchSkills = async () => {
  try {
    const response = await apiClient.get(`/skills`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};
export const fetchJobsByCompany = async (comID) => {
  try {
    const response = await apiClient.get(`/jobs/by-company/${comID}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};
export const addJob = async (jobData) => {
  try {
    const response = await apiClient.post(`/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};
export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await apiClient.put(`/jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};