<template>
<div class="container mt-5">
    <div class="web-title d-flex justify-content-center">
        <h3 class="text-primary">JOBLINKER</h3>
    </div>
    <button class="btn btn-link mb-3" @click="goBack">
        <i class="fa-solid fa-arrow-left"></i> Back
    </button>
    <div class="card shadow p-4">
        <h3 class="font-weight-bold mb-4">{{ jobName }}</h3>

        <div>
            <h5 class="font-weight-bold text-dark">Your CV<span class="text-danger">*</span></h5>
            <div class="p-3 border rounded mb-3 mt-3">
                <input @change="handleFileUpload" type="file" class="form-control" id="fileInput" />
                <p class="form-text mt-2">
                    Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password protection.
                </p>
            </div>
        </div>

        <div class="mt-4">
            <h5 class="font-weight-bold text-dark">Personal information<span class="text-danger">*</span></h5>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="fullName" class="form-label">Full name</label>
                        <input type="text" id="fullName" class="form-control" v-model="personalInfo.fullName" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" id="email" class="form-control" v-model="personalInfo.email" />
                    </div>
                </div>
            </div>
        </div>
        <div class="my-4 d-flex justify-content-center">
            <button class="btn btn-primary px-4" @click="applyForJob">
                Send my CV
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    uploadFile
} from '@/services/fileService';
import {
    createResume
} from '@/services/resumeService';
import {
    mapState
} from 'vuex';
export default {
    name: "JobApply",
    computed: {
        ...mapState("auth", ["user"]),
    },
    data() {
        return {
            personalInfo: {
                fullName: "",
                email: "",
            },
            file: null,
            jobId: null,
            uploadedFileName: null,
            jobName: null,

        };
    },
    created() {
        this.jobId = this.$route.params.id ? this.$route.params.id : null;
        if (this.user) {
            this.personalInfo.fullName = this.user.name;
            this.personalInfo.email = this.user.email;
        }
        this.jobName = this.$route.query.jobName || "Unknown Job";
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const sanitizedFileName = file.name.replace(/\s+/g, '-'); 
                const renamedFile = new File([file], sanitizedFileName, {
                    type: file.type
                });
                this.file = renamedFile;
            }
        },
        async applyForJob() {
            if (this.file) {
                this.uploadedFileName = await uploadFile(this.file, "resumes");
                console.log("Uploaded file name:", this.uploadedFileName);
            }
            const resumeData = {
                email: this.personalInfo.email,
                url: this.uploadedFileName,
                status: "PENDING",
                user: {
                    id: this.user.id,
                },
                job: {
                    id: this.jobId,
                },
            };
            console.log("Resume data:", resumeData);
            const createdResume = await createResume(resumeData);
            console.log("Resume created:", createdResume);

            alert("Application submitted successfully!");
            this.$router.push("/my-resumes");

        },
    },
};
</script>

<style>
.custom-file-upload {
    display: inline-block;
    color: #dc3545;
    font-weight: bold;
    text-align: center;
    border: 1px solid #dc3545;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #fff;
    transition: all 0.2s ease;
}

.custom-file-upload:hover {
    background-color: #f8d7da;
}

.custom-file-upload input {
    display: none;
}
</style>
