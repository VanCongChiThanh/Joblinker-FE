<template>
<div class="site-wrap">
    <div class="site-mobile-menu site-navbar-target">
        <div class="site-mobile-menu-header">
            <div class="site-mobile-menu-close mt-3">
                <span class="icon-close2 js-menu-toggle"></span>
            </div>
        </div>
        <div class="site-mobile-menu-body"></div>
    </div>
    <!-- .site-mobile-menu -->

    <!-- NAVBAR -->
    <NavBar class="fixed-top" />

    <!-- HOME -->
    <section class="home-section section-hero overlay bg-image" style="background-image: url('../assets/images/hero_1.jpg')" id="home-section">
        <div class="container">
            <jobSearch />
        </div>
    </section>

    <section class="py-5 bg-image overlay-primary fixed overlay" style="background-image: url('../assets/images/hero_1.jpg')">
        <div class="container">
            <div class="row mb-5 justify-content-center">
                <div class="col-md-7 text-center">
                    <h2 class="section-title mb-2 text-white">Opportunities Overview</h2>
                    <p class="lead text-white">
                        Unlock Your Career Potential. Discover thousands of opportunities, connect with top companies, and find your perfect role.
                    </p>
                </div>
            </div>
            <div class="row pb-0 block__19738 section-counter">
                <div class="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                    <div class="d-flex align-items-center justify-content-center mb-2">
                        <strong class="number" data-number="1930">0</strong>
                    </div>
                    <span class="caption">Candidates</span>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                    <div class="d-flex align-items-center justify-content-center mb-2">
                        <strong class="number">0</strong>
                    </div>
                    <span class="caption">Jobs Posted</span>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                    <div class="d-flex align-items-center justify-content-center mb-2">
                        <strong class="number" data-number="120">0</strong>
                    </div>
                    <span class="caption">Jobs Filled</span>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                    <div class="d-flex align-items-center justify-content-center mb-2">
                        <strong class="number">0</strong>
                    </div>
                    <span class="caption">Companies</span>
                </div>
            </div>
        </div>
    </section>
    <section class="site-section p-0 m-3" id="joblist">
        <div class="container border rounded">
            <div class="row my-3 mx-2">
                <h4 class="font-weight-bold text-primary">Featured Companies</h4>
            </div>
            <div class="justify-content-center w-100">
                <top-companies />
            </div>
        </div>
    </section>
    <div id="adsCarousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner text-center">
            <div class="carousel-item active">
                <img src="../../../public/assets/images/ads_1.jpg" class="d-block mx-auto" style="width: 800px; height: 300px; object-fit: cover;" alt="Slide 1">
            </div>
            <div class="carousel-item">
                <img src="../../../public/assets/images/ads_2.jpg" class="d-block mx-auto" style="width: 800px; height: 300px; object-fit: cover;" alt="Slide 2">
            </div>
        </div>
        <a class="carousel-control-prev" href="#adsCarousel" role="button" data-slide="prev" style="top: 50%; transform: translateY(-50%); color: black;">
            <span class="carousel-control-prev-icon" style="background-color: black; border-radius: 50%; opacity: 0.8;"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#adsCarousel" role="button" data-slide="next" style="top: 50%; transform: translateY(-50%); color: black;">
            <span class="carousel-control-next-icon" style="background-color: black; border-radius: 50%; opacity: 0.8;"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <section class="site-section p-0 m-3" id="joblist">
        <div class="container border rounded">
            <div class="row my-3 mx-1">
                <div class="col-12 d-flex align-items-center justify-content-between">
                    <div class="top-job-hot-title ">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-fire text-danger mr-2"></i>
                            <h5 class="font-weight-bold text-primary">Recommendation Jobs</h5>
                        </div>
                        <div class="gradient-underline"></div>
                    </div>
                    <a href="/search">View All</a>
                </div>
            </div>
            <div class="justify-content-center w-100">
                <top-jobs />
            </div>
        </div>
    </section>

    <section class="py-5 bg-image overlay-primary fixed overlay" style="background-image: url('../assets/images/hero_1.jpg')">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h2 class="text-white">Looking For A Job?</h2>
                    <p class="mb-0 text-white lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit tempora
                        adipisci impedit.
                    </p>
                </div>
                <div class="col-md-3 ml-auto">
                    <a href="#" class="btn btn-warning btn-block btn-lg">Sign Up</a>
                </div>
            </div>
        </div>
    </section>
    <Footer />

</div>
</template>

<script>
import TopJobs from "@/components/client/TopJobs.vue";
import jobSearch from "@/components/client/JobSearch.vue";
import NavBar from "@/components/client/NavBar.vue";
import TopCompanies from "@/components/client/TopCompanies.vue";
import Footer from "@/components/client/SiteFooter.vue";
import {
    mapState
} from "vuex";

export default {
    name: "HomePage",
    components: {
        jobSearch,
        NavBar,
        TopCompanies,
        TopJobs,
        Footer
    },
    methods: {
        ...mapState(["jobs", "companies"])
    }
};
</script>

<style scoped>
.top-job-hot-title {
    font-size: 2rem;
}

.gradient-underline {
    height: 4px;
    width: 100%;
    background: linear-gradient(to right, #f39c12, #e74c3c);
    margin-top: 8px;
    border-radius: 2px;
}
</style>
