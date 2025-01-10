<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid">
        <div v-if="jobDetails" class="row">
            <div class="col-md-8">
                <div class="card shadow-sm p-4">
                    <h2 class="job-title">{{ jobDetails.name }}</h2>
                    <p class="company-name text-dark">{{ jobDetails.company.name }}</p>
                    <div class="view-salary text-success font-weight-bold">
                        <i class="fas fa-dollar-sign"></i> {{ jobDetails.salary.toLocaleString() }}
                    </div>
                    <div class="apply d-flex align-items-center my-3">
                        <button class="btn btn-primary btn-block flex-grow-1">Apply now</button>
                        <label class="ml-3 d-flex align-items-center">
                            <input type="checkbox" class="heart-checkbox" />
                            <i class="far fa-heart ml-2"></i>
                        </label>
                    </div>
                    <h5 class="mt-4 font-weight-bold text-dark">Job Description</h5>
                    <p class="job-description text-dark">{{ jobDetails.description }}</p>
                    <div class="section-divider"></div>
                    <h5 class="mt-4 font-weight-bold text-dark">Skills Required</h5>
                    <div class="skills d-flex flex-wrap">
                        <button v-for="skill in jobDetails.skills" :key="skill.id" class="btn btn-light border-dark text-dark rounded-pill mr-2 mb-2" style="font-size: 0.85rem; padding: 0.2rem 0.3rem;">
                            {{ skill.name }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="company col-md-4 mb-5">
                <div class="card shadow-sm p-4 text-center">
                    <div class="company-info text-center">
                        <img :src="`http://localhost:8080/storage/companyLogo/${jobDetails.company.logo}`" class="logo img-fluid rounded mb-3" alt="Company Logo" />
                        <h4 class="font-weight-bold text-break mb-2">{{ jobDetails.company.name }}</h4>
                        <a href="#" class="text-primary d-block mb-2">
                            View company <i class="fas fa-external-link-alt"></i>
                        </a>
                        <p>{{ jobDetails.company.address }}</p>
                    </div>

                    <hr />
                    <ul class="list-unstyled text-left">
                        <li>
                            <strong>Company type:</strong> {{ jobDetails.companyType || "IT Product" }}
                        </li>
                        <div class="section-divider"></div>
                        <li>
                            <strong>Company industry:</strong> {{ jobDetails.companyIndustry || "Software Products and Web Services" }}
                        </li>
                        <div class="section-divider"></div>
                        <li>
                            <strong>Company size:</strong> {{ jobDetails.companySize || "51-150 employees" }}
                        </li>
                        <div class="section-divider"></div>
                        <li>
                            <strong>Country:</strong>
                            <img src="https://flagcdn.com/16x12/vn.png" alt="South Korea" width="20" class="ml-1" />
                            Vietnam
                        </li>
                        <div class="section-divider"></div>
                        <li>
                            <strong>Working days:</strong> Monday - Friday
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    <Footer></Footer>
</div>
</template>

<script>
import NavBar from "@/components/client/NavBar.vue";
import Footer from "@/components/client/SiteFooter.vue";
import {
    fetchJobDetails
} from "@/services/jobService";
export default {
    name: "JobDetail",
    components: {
        NavBar,
        Footer,
    },
    data() {
        return {
            jobDetails: null,
        };
    },
    methods: {
        async loadJobDetails() {
            try {
                const jobId = this.$route.params.id;
                const response = await fetchJobDetails(jobId);
                this.jobDetails = response.data;
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        },
    },
    mounted() {
        this.loadJobDetails();
    },
};
</script>

<style scoped>
.container-fluid {
    background-image: url('../../../public/assets/images/back_jobdetail.jpg');
    background-size: cover;
    background-position: center;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.company img.logo {
    max-width: 10vw;
    height: auto;
    margin-right: 10px;
}

.section-divider {
    border-top: 1px dashed #e0e0e0;
    margin: 0.5rem 0;
}

.heart-checkbox {
    display: none;
}

.heart-checkbox+i {
    font-size: 2rem;
    color: #ccc;
    cursor: pointer;
}

.heart-checkbox:checked+i {
    color: #ff0000;
}
</style>
