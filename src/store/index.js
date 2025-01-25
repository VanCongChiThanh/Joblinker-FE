import { createStore } from "vuex";
import auth from "./auth";
import company from "./company";
export default createStore({
  modules: {
    auth,
    company,
  },
});
