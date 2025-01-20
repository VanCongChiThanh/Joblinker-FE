<template>
<div>
    <div class="container">
        <div v-if="isLoading">
            <p>Loading user information...</p>
        </div>

        <div v-else class="info card shadow-sm pt-0 px-4 pb-4 mb-3 bg-white">
            <div class="d-flex align-items-center my-3">
                <div style="width: 5.5rem; height: 5.5rem; border-radius: 50%; background: linear-gradient(45deg, #ff6b6b, #f5a623, #27ae60, #3498db); padding: 0.1rem;">
                    <img :src="`http://localhost:8080/storage/avatar/${localUser.email}.jpg`" @error="setDefaultAvatar" style="width: 5.3rem; height: 5.3rem; object-fit: cover; border-radius: 50%; background-color: white;" />
                </div>
                <div class="ml-3">
                    <h3 class="font-weight-bold mb-1 mt-4 text-dark">{{ localUser.name }}</h3>
                    <span class="font-weight-bold">Update your title</span>
                </div>
            </div>
            <button class="btn btn-link edit-btn" title="Edit" data-toggle="modal" data-target="#exampleModal">
                <i class="fas fa-edit"></i>
            </button>
            <div class="row">
                <!-- Email -->
                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-envelope mr-2"></i>
                    <span>{{ localUser?.email ||"Your email" }}</span>
                </div>
                <!-- Phone Number -->
                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-phone mr-2"></i>
                    <span>Your phone number</span>
                </div>

                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-gift mr-2"></i>
                    <span>{{ localUser?.age||"Your age" }}</span>
                </div>
                <!-- Gender -->
                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-user mr-2"></i>
                    <span>{{ localUser?.gender||"Your gender" }}</span>
                </div>

                <!-- Current Address -->
                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span>{{ localUser?.address||"Your current address" }}</span>
                </div>
                <!-- Personal Link -->
                <div class="item col-6 d-flex align-items-center mb-2">
                    <i class="fas fa-globe mr-2"></i>
                    <span>Your personal link</span>
                </div>
            </div>
        </div>

    </div>
    <!-- modal update -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container row">
                        <div class="col-md-3">
                            <div style="width: 5.5rem; height: 5.5rem; border-radius: 50%; background: linear-gradient(45deg, #ff6b6b, #f5a623, #27ae60, #3498db); padding: 0.1rem;">
                                <img :src="`http://localhost:8080/storage/avatar/${localUser.email}.jpg`" @error="setDefaultAvatar" style="width: 5.3rem; height: 5.3rem; object-fit: cover; border-radius: 50%; background-color: white;" />
                            </div>
                        </div>
                        <form id="updateForm" class="col-md-9" @submit.prevent="handleFormSubmit">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="name">Full name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Your name" v-model="localUser.name">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Your email" v-model="localUser.email" readonly>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" class="form-control" id="phone" placeholder="Your phone number" readonly>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="age">Age</label>
                                    <input type="number" class="form-control" id="age" placeholder="Your age" v-model="localUser.age">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="gender">Gender</label>
                                    <select id="gender" class="form-control" v-model="localUser.gender">
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="location">Location</label>
                                    <input type="text" class="form-control" id="location" placeholder="Your current address" v-model="localUser.address">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="link">Personal Link</label>
                                    <input type="url" class="form-control" id="link" placeholder="Your personal link" readonly>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" form="updateForm">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import {
    fetchUserById,
    updateProfile
} from "@/services/userService";
export default {
    name: 'UserProfile',
    data() {
        return {
            localUser: {
                name: '',
                age: '',
                gender: '',
                address: ''
            },
            isLoading: true,
        };
    },
    computed: {
        ...mapState('auth', ['user']),
    },
    methods: {
        ...mapActions("auth", ["checkAuthentication"]),
        setDefaultAvatar(event) {
            event.target.src = 'http://localhost:8080/storage/avatar/default-avatar.jpg';
        },
        async fetchUserData(userId) {
            try {
                this.isLoading = true;
                const userData = await fetchUserById(userId);
                this.localUser = userData;
            } catch (error) {
                console.error('Failed to fetch user by ID:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async handleFormSubmit() {
            try {
                const updatedUser = await updateProfile(this.user.id, this.localUser);
                this.localUser = updatedUser;
                alert("Profile updated successfully!");
                window.location.reload();
            } catch (error) {
                console.error("Failed to update profile:", error);
                alert("An error occurred while updating the profile. Please try again.");
            }
        }
    },
    async created() {
        await this.checkAuthentication();
        if (this.user && this.user.id) {

            await this.fetchUserData(this.user.id);
        } else {
            console.warn('User not found or missing ID in Vuex');
            this.isLoading = false;
        }
    }

};
</script>

<style scoped>
.edit-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem;
    color: #ff6b6b;
}

.edit-btn:hover {
    color: #d9534f;
    text-decoration: none;
}

.item {
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
}
</style>
