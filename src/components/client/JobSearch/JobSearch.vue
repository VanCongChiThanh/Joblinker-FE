<template>
<div class="row align-items-center justify-content-center">
    <div class="col-md-12">
        <div class="mb-5 text-center">
            <h1 class="text-white font-weight-bold">Software Dev Jobs</h1>
            <p>Find your dream job...</p>
        </div>
        <form @submit.prevent="searchJobs" class="search-jobs-form">
            <div class="row mb-5">
                <div class="col-lg-1"></div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-2 mb-4 mb-lg-0">
                    <div class="dropdown w-100 h-100">
                        <button class="btn btn-secondary dropdown-toggle w-100 h-100 d-flex align-items-center justify-content-between" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="location">
                                <i class="fa-solid fa-location-dot mr-2"></i>
                                <span>Location</span>
                            </div>
                            <i class="fa-solid fa-caret-down"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Ha Noi</a>
                            <a class="dropdown-item" href="#">Ho Chi Minh</a>
                            <a class="dropdown-item" href="#">Da Nang</a>
                            <a class="dropdown-item" href="#">Remote</a>
                            <a class="dropdown-item" href="#">Other</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                    <input v-model="jobTitle" type="text" class="form-control form-control-lg" placeholder="Job title, keywords...">
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-2 mb-4 mb-lg-0">
                    <button type="submit" class="btn btn-primary btn-lg btn-block text-white btn-search"><span class="icon-search icon mr-2"></span>Search Job</button>
                </div>
                <div class="col-lg-1"></div>
            </div>
        </form>
        <div class="suggest">
            <div class="container">
                <div class="row">
                    <div class="col-lg-1"></div>
                    <div class="col-12 col-lg-10">
                        <div class="d-flex flex-wrap align-items-center">
                            <h5 class="mr-3">Suggestions for you:</h5>
                            <button type="button" class="btn btn-outline-light rounded-pill mr-2">Java</button>
                            <button type="button" class="btn btn-outline-light rounded-pill mr-2">ReactJS</button>
                            <button type="button" class="btn btn-outline-light rounded-pill mr-2">.NET</button>
                            <button type="button" class="btn btn-outline-light rounded-pill mr-2">Tester</button>
                            <button type="button" class="btn btn-outline-light rounded-pill mr-2">PHP</button>
                        </div>
                    </div>
                    <div class="col-lg-1"></div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    defineComponent
} from "vue";
import {
    mapState,
    mapActions
} from "vuex";

export default defineComponent({
    name: "JobSearch",

    data() {
        return {
            jobTitle: "",
            jobLocation: ""
        };
    },

    watch: {
        jobTitle(value) {
            this.jobTitle = value;
        },
        jobLocation(value) {
            this.jobLocation = value;
        }
    },

    computed: {
        ...mapState(["jobs"])
    },

    methods: {
        ...mapActions(["addJobs"]),

        searchJobs() {
            this.$router.replace("/#joblist");
            axios
                .get(`https://jobs.github.com/positions.json?search=${this.jobTitle}&location=${this.jobLocation}`)
                .then((response) => {
                    this.addJobs(response.data);
                })
                .catch((error) => {
                    console.log("Unable to reach server: " + error);
                });
        }
    }
});
</script>
