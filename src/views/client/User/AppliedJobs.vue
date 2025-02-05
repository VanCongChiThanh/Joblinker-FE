<template>
<div class="resume-page card shadow-sm p-4 mb-3">
    <h3 v-if="resumes.length > 0">Applied Jobs ( {{ totalPages }})</h3>
    <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover table-sm" v-if="resumes.length > 0">
            <thead class="thead-light">
                <tr>
                    <th>#</th>
                    <th>Job</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Date Submitted</th>
                    <th>CV</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(resume, index) in resumes" :key="resume.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <a :href="$router.resolve({ name: 'job-detail', params: { id: resume.job.id } }).href" target="_blank" rel="noopener noreferrer" class="text-primary">
                            {{ resume.job.name }}
                        </a>
                    </td>
                    <td>{{ resume.companyName }}</td>
                    <td>
                        <span class="badge" :class="{
          'badge-success': resume.status === 'APPROVED',
          'badge-warning': resume.status === 'PENDING',
          'badge-danger': resume.status === 'REJECTED',
          'badge-info': resume.status === 'REVIEWING'
        }">
                            {{ resume.status }}
                        </span>
                    </td>
                    <td>{{ new Date(resume.createdAt).toLocaleDateString() }}</td>
                    <td>
                        <a :href="getResumeUrl(resume.url)" target="_blank" class="btn btn-sm btn-outline-success shadow-sm text-center " title="View CV">
                            <i class="fas fa-eye my-1"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <p>No resumes found.</p>
        </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
        <button :disabled="currentPage === 1" @click="fetchData(currentPage - 1)">
            Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="fetchData(currentPage + 1)">
            Next
        </button>
    </div>
</div>
</template>

<script>
import apiClient from "@/services/api";

export default {
    data() {
        return {
            resumes: [],
            currentPage: 1,
            totalPages: 1,
            totalResumes: 0,
        };
    },
    methods: {
        async fetchData(page = 1) {
            try {
                const response = await apiClient.get("/resumes/by-user", {
                    params: {
                        page,
                        pageSize: 20
                    },
                });
                const data = response.data;
                if (data.statusCode === 200) {
                    this.resumes = data.data.result;
                    this.currentPage = data.data.meta.page;
                    this.totalPages = data.data.meta.pages;
                }
            } catch (error) {
                console.error("Error fetching resumes:", error);
            }
        },
        getResumeUrl(fileName) {
            return `http://localhost:8080/storage/resumes/${fileName}`;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style>
.resume-page {
    padding: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    border: 1px solid #ffffff;
    padding: 8px;
    text-align: left;
}

.pagination {
    margin-top: 20px;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
}

.pagination span {
    font-weight: bold;
}
</style>
