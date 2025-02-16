<template>
<div v-if="recentlyViewedJobs.length > 0" class="recently-viewed-jobs">
    <h4 class="title font-weight-bold pb-3 pl-2">Recent Viewed Jobs({{ recentlyViewedJobs.length }})</h4>
    <ul class="list-unstyled row px-2">
        <li v-for="job in recentlyViewedJobs" :key="job.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
            <div class="job-item border p-3 mb-3 rounded bg-white card shadow">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-muted">{{ timeAgo(job.createdAt) }}</span>
                    <span class="badge badge-primary px-2 py-1">{{ job.level }}</span>
                </div>
                <h3 class="job-title font-weight-bold mb-2" :title="job.name">
                    <router-link :to="{ name: 'job-detail', params: { id: job.id } }">
                        {{ job.name }}
                    </router-link>
                </h3>
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
            </div>
        </li>
    </ul>
</div>
<div v-else>
    <div class="text-center py-5">
        <h4 class="font-weight-bold">No recently viewed jobs found.</h4>
    </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default {
    name: "RecentlyViewedJobs",
    data() {
        return {
            recentlyViewedJobs: [],
        };
    },
    methods: {
        loadRecentlyViewedJobs() {
            let recentlyViewed = Cookies.get('recentlyViewedJobs');
            if (recentlyViewed) {
                recentlyViewed = JSON.parse(recentlyViewed);
            } else {
                recentlyViewed = [];
            }
            this.recentlyViewedJobs = recentlyViewed;
        },
        timeAgo(date) {
            return dayjs(date).fromNow();
        },
    },
    mounted() {
        this.loadRecentlyViewedJobs();
    },
};
</script>

<style scoped>
.title {
  background-color: rgb(241, 241, 241);
  margin: 0;
}
.list-unstyled{
background-color: rgb(241, 241, 241);
}
.recently-viewed-jobs {
    margin-top: 20px;
}

.company img.logo {
    max-width: 3vw;
    height: auto;
    margin-right: 10px;
}

.section-divider {
    border-top: 1px dashed #e0e0e0;
    margin: 0.5rem 0;
}
.job-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;  /* Giới hạn số dòng là 2 */
    -webkit-box-orient: vertical;  /* Đặt hướng của các dòng là dọc */
    overflow: hidden;  /* Ẩn phần văn bản vượt quá giới hạn */
    text-overflow: ellipsis;  /* Hiển thị dấu ba chấm khi có văn bản bị ẩn */
    white-space: normal;  
}
.job-link {
    display: block; /* Đảm bảo rằng router-link có thể áp dụng định dạng block */
}

</style>
