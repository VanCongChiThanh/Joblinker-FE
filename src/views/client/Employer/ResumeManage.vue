<template>
<div class="card shadow-sm p-4 mb-3 bg-white">
    <h2 class="text-xl font-bold mb-4">
        <span v-if="jobName">All resumes for job: {{ jobName }}</span>
        <span v-else>Resume List</span>
    </h2>

    <div class="mb-4 w-50">
        <input v-model="searchQuery" @keyup.enter="loadResumes" type="text" placeholder="Search by Email or Job Name" class="form-control mb-2" />
    </div>
    <div class="table-responsive">

        <table class="table table-striped" v-if="resumes.length > 0">
            <thead>
                <tr>
                    <th class="border px-4 py-2">#</th>
                    <th class="border px-4 py-2">Email</th>
                    <th class="border px-4 py-2">Company</th>
                    <th class="border px-4 py-2">Job</th>
                    <th class="border px-4 py-2">CV</th>
                    <th class="border px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(resume, index) in resumes" :key="resume.id">
                    <td class="border px-4 py-2">{{ index + 1 + (page - 1) * pageSize }}</td>
                    <td class="border px-4 py-2">{{ resume.email }}</td>
                    <td class="border px-4 py-2">{{ resume.companyName }}</td>
                    <td class="border px-4 py-2">
                        <a :href="$router.resolve({ name: 'job-detail', params: { id: resume.job.id } }).href" target="_blank" rel="noopener noreferrer" class="text-primary">
                            {{ resume.job.name }}
                        </a>
                    </td>
                    <td class="text-center py-auto">
                        <a :href="getResumeUrl(resume.url)" target="_blank" class="btn btn-sm btn-outline-success shadow-sm d-flex align-items-center justify-content-center" title="View CV">
                            <i class="fas fa-eye mr-1"></i>View
                        </a>
                    </td>
                    <td class="border px-4 py-2">
                        <select v-model="resume.status" @change="updateStatus(resume)" class="form-select form-select-sm">
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REVIEWING">REVIEWING</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </td>

                </tr>
            </tbody>
        </table>
        <div v-else class="text-center py-4">
            <p>No resumes available.</p>
        </div>
    </div>

</div>
</template>

<script>
import {
    fetchResumes,
    updateResume
} from "@/services/resumeService";

export default {
    data() {
        return {
            resumes: [],
            searchQuery: "",
            jobName: "",
            jobId: null,
        };
    },
    props: {
        page: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        jobIdProp: {
            type: String,
            default: "",
        },
    },
    mounted() {
        this.jobId = this.jobIdProp || this.$route.params.jobId || null;
        this.loadResumes();
    },
    methods: {
        async loadResumes() {
            try {
                const filters = {};

                if (this.searchQuery) {
                    filters.searchQuery = this.searchQuery;
                }

                if (this.jobId) {
                    filters.jobId = this.jobId;
                }

                this.resumes = await fetchResumes(filters, this.page, this.pageSize);
                if (this.jobId && this.resumes.length > 0) {
                    const job = this.resumes[0] ?.job;
                    this.jobName = job ? job.name : "Unknown Job";
                }

            } catch (error) {
                console.error("Error loading resumes:", error);
            }
        },
        getResumeUrl(fileName) {
            return `http://localhost:8080/storage/resumes/${fileName}`;
        },
        async updateStatus(resume) {
            try {
                const userConfirmed = confirm(`Are you sure you want to update the status to "${resume.status}"?`);
                if (!userConfirmed) {
                    return;
                }
                const response = await updateResume(resume.id, resume);
                alert(`Resume status updated to ${resume.status}`);
                console.log("Updated resume:", response);
                window.location.reload();
            } catch (error) {
                console.error("Error updating status:", error);
                alert("Failed to update status. Please try again.");
            }
        },
    },
};
</script>


