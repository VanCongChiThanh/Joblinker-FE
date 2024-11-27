import { createStore } from "vuex";

export default createStore({
  state: {
    jobs: [], 
    details: null, 
    companies: [],
  },
  mutations: {
    ADD_JOBS(state, jobs) {
      state.jobs = jobs || []; 
    },
    ADD_DETAIL(state, detail) {
      state.details = detail; 
    },
    ADD_COMPANIES(state, companies) {
      state.companies = companies||[]; 
    },
  },
  actions: {
    addJobs({ commit }, jobs) {
      commit("ADD_JOBS", jobs); 
    },
    addDetail({ commit }, detail) {
      commit("ADD_DETAIL", detail);
    },
    addCompanies({ commit }, companies) {
      commit("ADD_COMPANIES", companies);
    },
  },
  getters: {
    jobs: (state) => state.jobs,
    details: (state) => state.details,
    companies: (state) => state.companies,
  },
});
