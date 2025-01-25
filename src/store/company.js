import { fetchCompanyByUserId } from "@/services/companyService";

export default {
  state: {
    companyInfo: null, 
  },
  mutations: {
    setCompanyInfo(state, companyInfo) {
      state.companyInfo = companyInfo; 
    },
  },
  actions: {
    async fetchCompanyByUserId({ commit }, userId) {
      try {
        const response = await fetchCompanyByUserId(userId); 
        console.log("res:"+response)
        commit("setCompanyInfo", response);
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    },
  },
  getters: {
    getCompanyInfo: (state) => state.companyInfo, 
  },
};
