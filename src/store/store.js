import { createStore } from "vuex";

export default createStore({
  state: {
    jobs: {},
    details: {},
  },
  mutations: {
    ADD_JOB(state, payload) {
      state.jobs = payload;
    },
    ADD_DETAIL(state, payload) {
      state.details = payload;
    },
  },
  actions: {
    addJobs({ commit }, job) {
      commit("ADD_JOB", job);
    },
    addDetail({ commit }, detail) {
      commit("ADD_DETAIL", detail);
    },
  },
  getters: {
    jobs: (state) => state.jobs,
    details: (state) => state.details,
  },
});
