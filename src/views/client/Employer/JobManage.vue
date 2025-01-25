<template>
<div class="card shadow-sm p-4 mb-3 bg-white">
    <button class="btn btn-success btn-sm mb-3" @click="openModal(null)" style="width: 10%;" data-toggle="modal" data-target="#exampleModal">
        <i class="fa-solid fa-plus"></i>
    </button>

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
                        <button class="btn btn-info btn-sm mr-2" @click="openModal(job.id)">
                            <i class="fas fa-eye" data-toggle="modal" data-target="#exampleModal"></i>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{ selectedJobId ? "Update a job posting for your company" : "Post a job for your company" }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <job-form :jobId="selectedJobId" @job-changed="handleJobChange"></job-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    fetchJobsByCompany,
} from "@/services/jobService";
import JobForm from "./JobForm.vue";
export default {
    name: "UserDashboard",
    components: {
        JobForm,
    },
    data() {
        return {
            jobs: [],
            selectedJobId: null,
            company: null,
        };
    },
    computed: {
        ...mapState("auth", ["user"]),
    },
    methods: {
        async fetchData() {
            try {
                if (this.user && this.user.id) {
                    this.jobs = await fetchJobsByCompany(this.user.company.id);
                } else {
                    console.warn("User ID is missing.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        openModal(jobId) {
            this.selectedJobId = jobId;
        },
        handleJobChange() {
            this.fetchData();
            window.location.reload();
        },
    },
    created() {
        this.fetchData();
    },
};
</script>
