<template>
  <div class="mb-5">
    <div v-if="jobs.length > 0">
      <div v-for="job in jobs" :key="job.id" class="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
        <div class="col-md-2">
          <router-link :to="'/position/' + job.id"><img :src="job.company_logo" alt="Image" class="img-fluid"></router-link>
        </div>
        <div class="col-md-4">
          <span class="badge badge-primary px-2 py-1 mb-3">{{ job.type }}</span>
          <h2><router-link :to="'/position/' + job.id">{{ job.title }}</router-link></h2>
          <p class="meta"><router-link :to="'/position/' + job.id"><span>Apply</span></router-link></p>
        </div>
        <div class="col-md-3 text-left">
          <h3>Location</h3>
          <span class="meta">{{ job.location }}</span>
        </div>
        <div class="col-md-3 text-md-right">
          <!-- <strong class="text-black">$60k &mdash; $100k</strong> -->
        </div>
      </div>
    </div>
    <div v-else>No jobs available</div>
  </div>
</template>



<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "JobList",
  computed: {
    ...mapState(["jobs"]), 
  },
  methods: {
    ...mapActions(["addJobs", "addDetail"]), 
    addDetails(detail) {
      this.addDetail(detail);
    },
  },
  created() {
    axios
      .get("https://jobs.github.com/positions.json?search=python&location=us")
      .then((response) => {
        this.addJobs(response.data); // Sử dụng response.data
      })
      .catch((error) => {
        console.log("Unable to reach server: " + error);
      });
  },
  mounted() {
    if (this.jobs.length > 0) {
      console.log(this.jobs); // Không cần gọi jobs() nữa
    }
  },
});
</script>