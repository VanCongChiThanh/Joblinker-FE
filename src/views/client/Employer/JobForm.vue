<template>
<div class="job-form-container">
    <form @submit.prevent="handleSubmit">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="name">Job title</label>
                <input v-model="job.name" id="name" type="text" required class="form-control" />
            </div>

        </div>
        <div class="row">
            <div class="form-group col-md-12">
                <label for="skills">Skills</label>
                <div class="selected-skills">
                    <span v-for="skill in job.skills" :key="skill" class="badge mr-2 border p-2">
                        {{ skill.name }}
                        <i class="fa-solid fa-x text-danger cursor-pointer" @click="removeSkill(skill)" aria-label="Remove"></i>
                    </span>
                </div>
                <div class="mt-2 d-flex">
                    <select v-model="newSkill" class="form-control w-auto mr-2">
                        <option v-for="skill in availableSkills" :key="skill.id" :value="skill.id">
                            {{ skill.name }}
                        </option>
                    </select>
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="addSkill">
                        Add Skill
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label for="company">Company</label>
                <p id="company" class="form-control-plaintext text-primary font-weight-bold">
                    {{ job.company.name }}
                </p>
            </div>

            <div class="form-group col-md-6">
                <label for="location">Location</label>
                <select v-model="job.location" id="location" required class="form-control">
                    <option value="" disabled>Select a location</option>
                    <option value="HANOI">Hanoi</option>
                    <option value="DANANG">Da Nang</option>
                    <option value="HOCHIMINH">Ho Chi Minh</option>
                    <option value="REMOTE">Remote</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>

        </div>

        <div class="row">
            <div class="form-group col-md-4">
                <label for="quantity">Quantity</label>
                <input v-model.number="job.quantity" id="quantity" type="number" required class="form-control" />
            </div>

            <div class="form-group col-md-4">
                <label for="level">Level</label>
                <select v-model="job.level" id="level" required class="form-control">
                    <option value="INTERN">Intern</option>
                    <option value="FRESHER">Fresher</option>
                    <option value="JUNIOR">Junior</option>
                    <option value="MIDDLE">Middle</option>
                    <option value="SENIOR">Senior</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="salary">Salary(USD)</label>
                <input v-model.number="job.salary" id="salary" type="number" required class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-5">
                <label for="startTime">Start Time</label>
                <input v-model="job.startTime" id="startTime" type="datetime-local" required class="form-control" />
            </div>

            <div class="form-group col-md-5">
                <label for="endTime">End Time</label>
                <input v-model="job.endTime" id="endTime" type="datetime-local" required class="form-control" />
            </div>

            <div class="form-check my-auto col-md-2">
                <input v-model="job.active" id="active" type="checkbox" class="form-check-input" />
                <label for="active" class="form-check-label">Active</label>
            </div>
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="job.description" id="description" required class="form-control" rows="5"></textarea>
        </div>

        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">
                {{ jobId ? "Update Job" : "Post Job" }}
            </button>
        </div>
    </form>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    addJob,
    updateJob,
    fetchJobDetails
} from '@/services/jobService';
import {
    fetchSkills
} from '@/services/jobService';
export default {
    props: {
        jobId: {
            type: Number,
            default: null,
        },
    },
    computed: {
        ...mapState("auth", ["user"]),
    },
    data() {
        return {
            job: {
                id: this.jobId || null,
                name: "",
                skills: [],
                company: {
                    id: null
                },
                salary: null,
                quantity: null,
                level: "",
                description: "",
                startTime: "",
                endTime: "",
                active: false,
                location: "",
            },
            availableSkills: [],
            newSkill: null,
        };
    },
    watch: {
        async jobId(newJobId) {
            this.job = {
                id: null,
                name: "",
                skills: [],
                company: {
                    id: null,
                },
                salary: null,
                quantity: null,
                level: "",
                description: "",
                startTime: "",
                endTime: "",
                active: false,
                location: "",
            };
            this.job.company.id = this.user.company.id;
            this.job.company.name = this.user.company.name;
            if (newJobId) {
                try {
                    const jobDetails = await fetchJobDetails(newJobId);
                    this.job = {
                        ...jobDetails
                    };
                    if (this.job.startTime) {
                        this.job.startTime = this.formatToDatetimeLocal(this.job.startTime);
                    }
                    if (this.job.endTime) {
                        this.job.endTime = this.formatToDatetimeLocal(this.job.endTime);
                    }

                } catch (error) {
                    console.error("Error fetching job details:", error);
                    alert("Failed to fetch job details. Please try again later.");
                }
            }
        },
    },
    async mounted() {
        try {
            const skillsResponse = await fetchSkills();
            this.availableSkills = skillsResponse.data.result;
            await this.fetchCompanyDetails();
        } catch (error) {
            console.error("Error fetching skills:", error);
        }

    },
    methods: {
        async fetchCompanyDetails() {
            if (this.user && this.user.id) {
                console.log(this.user)
                try {
                    this.job.company.id = this.user.company.id;
                    this.job.company.name = this.user.company.name;
                } catch (error) {
                    console.error("Error fetching company:", error);
                }
            }
        },
        async handleSubmit() {
            try {
                this.job.startTime = this.formatToISO(this.job.startTime);
                this.job.endTime = this.formatToISO(this.job.endTime);
                if (this.jobId) {
                    await updateJob(this.jobId, this.job);
                    alert("Job updated successfully!");
                } else {
                    await addJob(this.job);
                    alert("Job added successfully!");
                }
                this.job.startTime = this.formatToDatetimeLocal(this.job.startTime);
                this.job.endTime = this.formatToDatetimeLocal(this.job.endTime);
                this.$emit('job-changed');
            } catch (error) {
                console.error("Error submitting job:", error);
                alert("An error occurred. Please try again.");
            }
        },
        removeSkill(skillId) {
            this.job.skills = this.job.skills.filter(skill => skill !== skillId);
        },
        addSkill() {
            const selectedSkill = this.availableSkills.find(skill => skill.id === this.newSkill);

            if (selectedSkill) {
                const alreadyAdded = this.job.skills.some(skill => skill.id === selectedSkill.id);

                if (!alreadyAdded) {
                    this.job.skills.push(selectedSkill);
                } else {
                    alert("Skill already added!");
                }
            } else {
                alert("Please select a valid skill!");
            }

            this.newSkill = null;
        },
        formatToDatetimeLocal(datetime) {
            if (!datetime) return "";
            const date = new Date(datetime);
            return date.toISOString().slice(0, 16);
        },
        formatToISO(datetime) {
            if (!datetime) return "";
            const date = new Date(datetime);
            return date.toISOString();
        },
    },
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}
</style>
