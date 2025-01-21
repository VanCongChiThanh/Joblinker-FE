import authService from "@/services/authService";

const state = {
  status: {
    loggedIn: !!localStorage.getItem("access_token"), // Kiểm tra nếu có access_token
  },
  user: null,
};

const mutations = {
  loginRequest(state) {
    state.status = { loggingIn: true };
    state.user = null;
  },
  loginSuccess(state) {
    state.status = { loggedIn: true };
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
};

const actions = {
  async login({ commit }, { username, password }) {
    commit("loginRequest");
    try {

      await authService.login(username, password);
      commit("loginSuccess");

      const user = await authService.fetchUser();

      commit("setUser", user);
    } catch (error) {
      commit("loginFailure");
      console.error("Login failed:", error);
      throw error;
    }
  },
  async fetchUser({ commit }) {
    try {
      const user = await authService.fetchUser();
      commit("setUser", user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },
  logout({ commit }) {
    authService.logout();
    commit("logout");
  },
  async checkAuthentication({ dispatch, commit }) {
    const token = localStorage.getItem("access_token");
    if (token) {
      commit("loginSuccess");
      try {
        await dispatch("fetchUser");
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch("logout");
      }
    } else {
      commit("logout");
    }
  },
};

const getters = {
  isAuthenticated: (state) => state.status.loggedIn,
  user: (state) => state.user,
  hasRole: (state) => (role) => state.user?.role === role,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
