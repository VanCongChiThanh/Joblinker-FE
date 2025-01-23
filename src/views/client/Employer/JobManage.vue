<template>
  <div class="card shadow-sm p-4 mb-3 bg-white">
    <div v-if="jobs && jobs.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Job Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in jobs" :key="job.id">
            <td>{{ index + 1 }}</td>
            <td>{{ job.name }}</td>
            <td>
              <button class="btn btn-info btn-sm mr-2">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading jobs...</p>
    </div>
  </div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    fetchJobsByEmployer
} from "@/services/jobService";

export default {
    name: "UserDashboard",
    data() {
        return {
            jobs: [],
        };
    },
    computed: {
        ...mapState("auth", ["user"]),
    },
    methods: {
        async fetchData() {
            try {
                if (this.user && this.user.id) {
                    this.jobs = await fetchJobsByEmployer(this.user.id);
                } else {
                    console.warn("User ID is missing.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>
