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
    // Xây dựng tiêu chí filter
    const filterCriteria = [];
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
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return { content: [] };
  }
};
export const fetchTopJobs = async () => {
  try {
    const response = await apiClient.get("/jobs/top-jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching top companies:", error);
    throw error;
  }
};