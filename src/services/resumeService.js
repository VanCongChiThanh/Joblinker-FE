import apiClient from "./api";

export const createResume = async (resumeData) => {
  try {
    const response = await apiClient.post("/resumes", resumeData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume");
  }
};
export const updateResume = async (id,resumeData) => {
  try {
    const response = await apiClient.put(`/resumes/${id}`, resumeData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
};
export const fetchResumesByUser = async (page = 1, pageSize = 20) => {
  try {
    const response = await apiClient.get(`/resumes/by-user`, {
      params: { page, pageSize },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching resumes by user:", error);
    throw new Error("Failed to fetch resumes by user");
  }
};

export const fetchResumes = async (filters = {}, page = 1, pageSize = 20) => {
  try {
    const params = {
      page,
      size: pageSize,
    };

    if (filters.searchQuery) {
      params.filter = `job.name~'${filters.searchQuery}' OR email~'${filters.searchQuery}'`;
    }

    if (filters.jobId) {
      params.filter = params.filter
        ? `${params.filter} AND job.id~'${filters.jobId}'`
        : `job.id~'${filters.jobId}'`;
    }

    const response = await apiClient.get("/resumes", { params });
    return response.data.data.result;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw new Error("Failed to fetch resumes");
  }
};


