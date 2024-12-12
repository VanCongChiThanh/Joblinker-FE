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
            <!-- Search -->
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
                        <strong class="number">{{jobs().length}}</strong>
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
                        <strong class="number">{{ companies().length }}</strong>
                    </div>
                    <span class="caption">Companies</span>
                </div>
            </div>
        </div>
    </section>

    <section class="site-section p-0" id="joblist">
        <div class="container">
            <div class="row my-3">
                <div class="col-sm-5">
                    <div class="top-job-hot-title d-flex align-items-center">
                        <i class="fas fa-fire text-danger mr-2"></i>
                        <h3 class="font-weight-bold text-primary">TOP JOB HOT</h3>
                    </div>
                    <div class="gradient-underline"></div>
                </div>
            </div>
            <div class="justify-content-center w-100">

                <joblist />
            </div>
        </div>
    </section>

    <section class="site-section py-4 mb-5 border-top">
        <h2 class="text-center mb-4">Top Employers</h2>
        <employer-list />
    </section>

    <section class="bg-light pt-5 testimony-full">
        <div class="owl-carousel single-carousel">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 mx-auto">
                        <img class="img-fluid mx-auto" src="../../assets/images/ste.jpg" alt="Image" />
                        <blockquote>
                            <p>
                                &ldquo;Cách duy nhất để làm tốt công việc là yêu thích những gì bạn làm. Nếu bạn chưa tìm ra nó, hãy tiếp tục tìm kiếm. Đừng dừng lại..&rdquo;
                            </p>
                            <p><cite> &mdash; Steve Jobs</cite></p>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 mx-auto">
                        <img class="img-fluid mx-auto" src="../../assets/images/musk.jpg" alt="Image" />
                        <blockquote>
                            <p>
                                &ldquo;Đầu tư vào bản thân bạn là khoản đầu tư tốt nhất mà bạn có thể thực hiện. Bất cứ điều gì bạn làm để cải thiện kỹ năng hoặc hiểu biết của mình đều sẽ mang lại lợi ích trong tương lai..&rdquo;
                            </p>
                            <p><cite> &mdash; Elon Musk</cite></p>
                        </blockquote>
                    </div>
                </div>
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

    <footer class="site-footer">
        <div class="container">
            <div class="row mb-5">
                <div class="col-6 col-md-3 mb-4 mb-md-0">
                    <h3>Search Trending</h3>
                    <ul class="list-unstyled">
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">Graphic Design</a></li>
                        <li><a href="#">Web Developers</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">HTML5</a></li>
                        <li><a href="#">CSS3</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-3 mb-4 mb-md-0">
                    <h3>Company</h3>
                    <ul class="list-unstyled">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Career</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Resources</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-3 mb-4 mb-md-0">
                    <h3>Support</h3>
                    <ul class="list-unstyled">
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-3 mb-4 mb-md-0">
                    <h3>Contact Us</h3>
                    <div class="footer-social">
                        <a href="#"><span class="icon-facebook"></span></a>
                        <a href="#"><span class="icon-twitter"></span></a>
                        <a href="#"><span class="icon-instagram"></span></a>
                        <a href="#"><span class="icon-linkedin"></span></a>
                    </div>
                </div>
            </div>

            <div class="row text-center">
                <div class="col-12">
                    <p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        <!-- Copyright &copy;

<script>
document.write(new Date().getFullYear());
</script> All rights reserved | This template is made with <i
                class="icon-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> -->
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import joblist from "@/components/client/JobList.vue";
import jobSearch from "@/components/client/JobSearch.vue";
import NavBar from "@/components/client/NavBar.vue";
import EmployerList from "@/components/client/TopCompanies.vue";
import { mapState } from "vuex";

export default {
  name: "HomePage",
  components: {
    joblist,
    jobSearch,
    NavBar,
    EmployerList,
  },
  methods:{
    ...mapState(["jobs","companies"])
  }
};
</script>

<style scoped>
.top-job-hot-title {
    font-size: 2.5rem;
}

.gradient-underline {
    height: 4px;
    width: 100%;
    background: linear-gradient(to right, #f39c12, #e74c3c);
    margin-top: 8px;
    border-radius: 2px;
}
</style>
