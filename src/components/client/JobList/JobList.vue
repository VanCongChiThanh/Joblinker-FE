<template>
<div class="mb-5 p-3 bg-light rounded">
    <div v-if="jobs.length > 0">
        <div class="row">
            <div class="col-sm-5 fixed-height">
                <div class="job-list">
                    <div v-for="job in jobs" :key="job.id" class="job-item border-bottom pb-3 mb-3 pt-3 bg-white rounded shadow-sm" @click="selectJob(job)" style="cursor: pointer; max-height: 600px; overflow-y: auto;">
                        <div class="job-item border p-3 mb-3 rounded bg-light">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="text-muted">{{ timeAgo(job.createdAt) }}</span>
                                <span class="badge badge-primary px-2 py-1">{{ job.level }}</span>
                            </div>
                            <h3 class="job-title font-weight-bold mb-2">{{ job.name }}</h3>
                            <div class="company d-flex align-items-center mb-2">
                                <img :src="`http://localhost:8080/storage/companyLogo/${job.company.logo}`" class="logo mr-2 rounded" alt="Company Logo" />
                                <span class="font-weight-bold">{{ job.company.name }}</span>
                            </div>
                            <div class="salary text-success font-weight-bold mb-2">
                                <i class="fas fa-dollar-sign"></i> {{ job.salary.toLocaleString() }}
                            </div>
                            <div class="section-divider"></div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-briefcase mr-2"></i>
                                <span>At the office</span>
                            </div>
                            <div class="location mb-2">
                                <i class="fas fa-location-dot mr-2"></i>{{ job.location }}
                            </div>
                            <div class="skills d-flex flex-wrap">
                                <button v-for="skill in job.skills" :key="skill.id" class="btn btn-light border-dark text-dark rounded-pill mr-2 mb-2" style="font-size: 0.7rem; padding: 0.2rem 0.3rem;">
                                    {{ skill.name }}
                                </button>
                            </div>
                            <div class="section-divider"></div>
                            <ul class="benefits list-unstyled mt-2 text-dark">
                                <li><i class="fas fa-circle mr-2" style="font-size: 0.5rem; color: #dc3545;"></i> Premium Healthcare program for you and your family</li>
                                <li><i class="fas fa-circle mr-2" style="font-size: 0.5rem; color: #dc3545;"></i> Monthly childcare support, Paternity Leave</li>
                                <li><i class="fas fa-circle mr-2" style="font-size: 0.5rem; color: #dc3545;"></i> Frequent US working opportunities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
                <job-details v-if="selectedJob" :job="selectedJob" />
            </div>
        </div>
    </div>
    <div v-else>No jobs available</div>
</div>
</template>

<script>
import {
    defineComponent
} from "vue";
import {
    mapState,
    mapActions
} from "vuex";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import JobDetails from "../JobDetails/JobDetails.vue";
import {
    fetchJobs
} from "@/services/jobService";

dayjs.extend(relativeTime);

export default defineComponent({
    name: "JobList",
    components: {
        JobDetails,
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 4,
            filter: "name~''",
            selectedJob: null,
        };
    },
    computed: {
        ...mapState(["jobs"]),
    },
    methods: {
        ...mapActions(["addJobs"]),
        selectJob(job) {
            this.selectedJob = job;
        },
        timeAgo(date) {
            return dayjs(date).fromNow();
        },
        async loadJobs() {
            try {
                const response = await fetchJobs(this.currentPage, this.pageSize,this.filter);
                if (response.statusCode === 200 && response.data && response.data.result) {
                    this.addJobs(response.data.result);
                } else {
                    console.error("Invalid response structure:", response);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
    },
    async created() {
        await this.loadJobs();
    },
});
</script>

<style scoped>
img {
    width: 100%;
    height: auto;
}

.fixed-height {
    height: 750px;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.company img.logo {
    max-width: 2vw;
    height: auto;
    margin-right: 10px;
}

.section-divider {
    border-top: 1px dashed #e0e0e0;
    margin: 0.5rem 0;
}
</style>
