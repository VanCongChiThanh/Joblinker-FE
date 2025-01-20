<template>
<div>
    <NavBar class="fixed-top" />
    <section class="background" style="background: linear-gradient(to left, #00008b, #000); padding: 100px 0 50px 0;" id="home-section">
        <div class="container">
            <jobSearch />
        </div>
    </section>
    <section class="container mt-4">
        <div v-if="totalJobs > 0" class="mb-4">
            <h3>
                <span class="mr-2">{{ totalJobs}}</span>
                <span v-html="highlightKeyword(keyword)"></span>
                jobs in Vietnam
            </h3>
        </div>
        <job-list :jobs="jobs" :keyword="keyword" />
        <div v-if="meta && meta.pages > 1" class="pagination d-flex justify-content-center mb-5">
            <button :disabled="currentPage === 1" @click="loadPage(currentPage - 1)" class="btn-outline">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span v-for="page in meta.pages" :key="page" class="mx-1">
                <button :class="{'btn-primary': currentPage === page, 'btn-outline-primary': currentPage !== page}" class="btn" @click="loadPage(page)">
                    {{ page }}
                </button>
            </span>
            <button :disabled="currentPage === meta.pages" @click="loadPage(currentPage + 1)" class="btn-outline">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </section>
    <Footer />
</div>
</template>

<script>
import {
    fetchJobs
} from '@/services/jobService';
import NavBar from "@/components/client/NavBar.vue";
import Footer from "@/components/client/SiteFooter.vue";
import jobSearch from "@/components/client/JobSearch.vue";
import jobList from "@/components/client/JobList.vue";
export default {
    name: "LoginPage",
    components: {
        NavBar,
        Footer,
        jobSearch,
        jobList,
    },
    data() {
        return {
            keyword: this.$route.query.keyword || '',
            location: this.$route.query.location || '',
            jobs: [],
            meta: null,
            currentPage: 1,
            pageSize: 10,
            totalJobs: 0
        };
    },
    watch: {
        '$route.query.keyword'(newKeyword) {
            this.keyword = newKeyword;
            this.loadJobs(1);
        }
    },
    methods: {
        async loadJobs(page = 1) {
            try {
                const response = await fetchJobs(page, this.pageSize, this.keyword, this.location);
                this.jobs = response.data.result;
                this.meta = response.data.meta;
                if (this.meta) {
                    this.totalJobs = this.meta.total
                }
            } catch (error) {
                console.error("Không thể tải dữ liệu công việc:", error);
            }
        },
        loadPage(page) {
            if (page >= 1 && page <= this.meta.pages) {
                this.currentPage = page;
                this.loadJobs(page);
                this.$router.push({
                    name: 'searchpage',
                    query: {
                        keyword: this.keyword,
                        page
                    }
                });
            }
        },
        highlightKeyword(keyword) {
            if (!keyword) return '';
            return `<span style="color: red; font-weight: bold;">${keyword}</span>`;
        }
    },
    mounted() {
        this.loadJobs(this.currentPage);
    }
};
</script>
