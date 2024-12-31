import { createStore } from "vuex";
import authService from "@/services/authService";

export default createStore({
  state: {
    jobs: [],
    details: null,
    companies: [],
    status: {
      loggedIn: false, // Đảm bảo có thuộc tính loggedIn trong status
    },
    user: null,
  },
  mutations: {
    ADD_JOBS(state, jobs) {
      state.jobs = [...state.jobs, ...jobs];
    },
    SET_DETAIL(state, detail) {
      state.details = detail;
    },
    ADD_COMPANIES(state, companies) {
      state.companies = [...state.companies, ...companies];
    },
    SET_AUTHENTICATED(state, status) {
      state.status.loggedIn = status;
    },
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
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
    login({ commit }, { username, password }) {
      commit("loginRequest", { username });
      authService.login(username, password).then(
        (user) => {
          commit("loginSuccess", user);
          commit("SET_AUTHENTICATED", true);
        },
        (error) => {
          commit("loginFailure");
          commit("SET_AUTHENTICATED", false); 
          console.error("Login failed:", error);
        }
      );
    },
    logout({ commit }) {
      authService.logout();
      commit("logout");
    },
    checkAuthentication({ commit }) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        commit("loginSuccess", user);
        commit("SET_AUTHENTICATED", true);
      } else {
        commit("logout");
      }
    },
  },
  getters: {
    jobs: (state) => state.jobs,
    details: (state) => state.details,
    companies: (state) => state.companies,
    isAuthenticated: (state) => state.status.loggedIn,
    user: (state) => state.user,
  },
  modules: {},
});
