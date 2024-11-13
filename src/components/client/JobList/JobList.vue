<template>
<div class="mb-5 p-3 bg-light rounded">
    <div v-if="jobs.length > 0">
        <div class="row">
            <div class="col-sm-5 fixed-height">
                <div class="job-list">
                    <div v-for="job in jobs" :key="job.id" class="job-item border-bottom pb-3 mb-3 pt-3 bg-white rounded shadow-sm" @click="selectJob(job)" style="cursor: pointer; max-height: 600px; overflow-y: auto;">
                        <div class="item pb-3 mb-3 pt-3 p-3">
                            <div class="badge d-flex justify-content-between align-items-center text-align-center">
                                <span class="time">{{ timeAgo(job.createdAt) }}</span>
                                <span class="badge-primary px-2 py-1 mb-3">{{ job.level }}</span>
                            </div>
                            <div class="title">
                                <h3>{{ job.name }}</h3>
                            </div>
                            <div class="company d-flex align-items-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2xldVFYuNkJxgaNlwmeEUWOolsqrU9-6TA&s" class="logo" />
                                <span>{{ job.company.name }}</span>
                            </div>
                            <strong class="text-black">${{ job.salary.toLocaleString() }}</strong>

                            <div class="location">
                                <i class="fa-solid fa-location-dot"></i>
                                {{ job.location }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
                <job-preview v-if="selectedJob" :job="selectedJob" />
            </div>
        </div>
    </div>
    <div v-else>No jobs available</div>
</div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import JobPreview from "./JobPreview.vue"; 

dayjs.extend(relativeTime);

export default defineComponent({
    name: "JobList",
    components: {
        JobPreview, 
    },
    data() {
        return {
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
    },
    created() {
        axios.get("http://localhost:8080/api/v1/jobs")
            .then((response) => {
                if (response.data.statusCode === 200 && response.data.data.result) {
                    this.addJobs(response.data.data.result);
                } else {
                    console.error("Invalid response structure:", response.data);
                }
            })
            .catch((error) => {
                console.log("Unable to reach server: " + error);
            });
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
</style>
