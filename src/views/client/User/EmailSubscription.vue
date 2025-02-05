<template>
<div class="container">
    <div class="card shadow-sm p-4 bg-white">
        <h4 class="font-weight-bold">Subscribe to Job Robot for new jobs and company reviews</h4>
        <p>
            By subscribing, Job Robot will suggest in-demand jobs that match your skills via email or update new reviews and job openings from your favorite company.
        </p>

        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email" class="font-weight-bold">Email:</label>
                        <input v-model="subscribers.email" type="email" id="email" class="form-control" required disabled />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name" class="font-weight-bold">Name:</label>
                        <input v-model="subscribers.name" type="text" id="name" class="form-control" required disabled />
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="skills" class="font-weight-bold">Skills</label>
                <div class="selected-skills">
                    <span v-for="skill in subscribers.skills" :key="skill.id" class="badge mr-2 border p-2">
                        {{ skill.name }}
                        <i class="fa-solid fa-times text-danger ml-1 cursor-pointer" @click="removeSkill(skill)" aria-label="Remove"></i>
                    </span>
                </div>
                <div class="d-flex mt-3">
                    <div class="col-6 col-md-4 col-lg-3">
                        <select v-model="newSkill" class="form-control">
                            <option v-for="skill in availableSkills" :key="skill.id" :value="skill.id">
                                {{ skill.name }}
                            </option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="addSkill">
                        Add Skill
                    </button>
                </div>
            </div>

            <div v-if="hasSubscribed" class="d-flex flex-column">
                <span class="alert alert-success text-center">You have already subscribed!</span>
                <div class="d-flex justify-content-center">
                    <button type="button" @click="updateSubscriberData" class="btn btn-primary ml-2">Update Subscription</button>
                    <button type="button" @click="deleteSubscriberData" class="btn btn-danger ml-2">Unsubscribe</button>
                </div>
            </div>

            <div v-else class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary btn-block w-25" :disabled="hasSubscribed">
                    Subscribe
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    fetchSkills
} from "@/services/jobService";
import {
    createSubscriber,
    deleteSubscriber,
    fetchSubscriberSkillsByUser,
    updateSubscriber
} from "@/services/subscriberService";
import {
    mapState
} from "vuex";

export default {
    data() {
        return {
            subscribers: {
                email: "",
                name: "",
                skills: [],
            },
            availableSkills: [],
            newSkill: null,
            hasSubscribed: false,
        };
    },
    computed: {
        ...mapState("auth", ["user"]),
    },
    watch: {
        user: {
            immediate: true,
            async handler(newUser) {
                if (newUser) {
                    this.subscribers.email = newUser.email || "";
                    this.subscribers.name = newUser.name || "";
                    try {
                        const response = await fetchSubscriberSkillsByUser();
                        if (response && response.data) {
                            this.subscribers = response.data;
                            this.hasSubscribed = true;
                        }
                    } catch (error) {
                        console.error("No subscriber found:", error);
                    }
                }
            },
        },
    },
    methods: {
        async submitForm() {
            const isConfirmed = window.confirm("Are you sure you want to subscribe?");
            if (isConfirmed) {
                await createSubscriber(this.subscribers);
                this.hasSubscribed = true;
            } else {
                console.log("Subscription canceled.");
            }
            window.location.reload();
        },
        async updateSubscriberData() {
            const isConfirmed = window.confirm("Are you sure you want to update the subscriber?");
            if (isConfirmed) {
                try {
                    const updatedSubscriber = await updateSubscriber(this.subscribers.id, this.subscribers);
                    console.log("Subscriber updated:", updatedSubscriber);
                    this.hasSubscribed = true;
                } catch (error) {
                    console.error("Error updating subscriber:", error);
                }
            } else {
                console.log("Update canceled.");
            }
            window.location.reload();
        },
        async deleteSubscriberData() {
            const isConfirmed = window.confirm("Are you sure you want to delete this subscriber?");
            if (isConfirmed) {
                try {
                    const result = await deleteSubscriber(this.subscribers.id);
                    console.log(result.message);
                    this.hasSubscribed = false;
                } catch (error) {
                    console.error("Error deleting subscriber:", error);
                }
            } else {
                console.log("Deletion canceled.");
            }
            window.location.reload();
        },
        removeSkill(skill) {
            this.subscribers.skills = this.subscribers.skills.filter((s) => s.id !== skill.id);
        },
        addSkill() {
            const selectedSkill = this.availableSkills.find((skill) => skill.id === this.newSkill);

            if (selectedSkill) {
                const alreadyAdded = this.subscribers.skills.some((skill) => skill.id === selectedSkill.id);

                if (!alreadyAdded) {
                    this.subscribers.skills.push(selectedSkill);
                } else {
                    alert("Skill already added!");
                }
            } else {
                alert("Please select a valid skill!");
            }
            this.newSkill = null;
        },
    },
    async mounted() {
        try {
            const skillsResponse = await fetchSkills();
            this.availableSkills = skillsResponse.data.result;
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    },
};
</script>
