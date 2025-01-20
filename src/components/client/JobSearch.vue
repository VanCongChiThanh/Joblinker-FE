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
                            <a class="dropdown-item" href="/search?location=HANOI">Ha Noi</a>
                            <a class="dropdown-item" href="/search?location=HOCHIMINH">Ho Chi Minh</a>
                            <a class="dropdown-item" href="/search?location=DANANG">Da Nang</a>
                            <a class="dropdown-item" href="/search?location=REMOTE">Remote</a>
                            <a class="dropdown-item" href="/search?location=OTHER">Other</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 mb-lg-0">
                    <input v-model="keyword" type="text" class="form-control form-control-lg" placeholder="Job title, keywords...">
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
                            <a href="/search?keyword=java" class="btn btn-outline-light rounded-pill mr-2">Java</a>
                            <a href="/search?keyword=.net" class="btn btn-outline-light rounded-pill mr-2">.Net</a>
                            <a href="/search?keyword=tester" class="btn btn-outline-light rounded-pill mr-2">Tester</a>
                            <a href="/search?keyword=react" class="btn btn-outline-light rounded-pill mr-2">React.JS</a>
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
export default {
    name: "JobSearch",
    data() {
        return {
            keyword: '',
        };
    },
    methods: {
        async searchJobs() {
            if (this.keyword.trim()) {
                this.$router.push({
                    name: 'searchpage',
                    query: {
                        keyword: this.keyword
                    }
                });
            } else {
                this.$router.push({
                    name: 'searchpage'
                });
            }
        },
    },
};
</script>
