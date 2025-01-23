<template>
<div class="container">
    <div>
        <div class="info card shadow-sm pt-0 px-4 pb-4 mb-3 bg-white" v-if="user">
            <div class="d-flex align-items-center">
                <div style="width: 5.5rem; height: 5.5rem; border-radius: 50%; background: linear-gradient(45deg, #ff6b6b, #f5a623, #27ae60, #3498db); padding: 0.1rem;">
                    <img :src="`http://localhost:8080/storage/avatar/${user.email}.jpg`" @error="setDefaultAvatar" style="width: 5.3rem; height: 5.3rem; object-fit: cover; border-radius: 50%; background-color: white;" />

                </div>

                <div class="ml-3">
                    <h3 class="font-weight-bold mb-1 mt-4 text-dark">{{ user.name }}</h3>
                    <div class="your-title">
                        <i class="fas fa-briefcase mr-1"></i>Update your title
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope mr-1"></i>{{ user.email }}
                    </div>
                    <a href="/profile" class="text-primary mt-2 d-block">
                        Update your profile <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading user information...</p>
        </div>
    </div>
    <div class="cv card shadow-sm p-4 mb-3 bg-white">
        <h4 class="font-weight-bold">Your Attached CV</h4>
        <div class="center">
            <img src="../../../../public/assets/images/cv.svg" alt="">
            <p class="mt-2 text-center">You have not attached a CV yet. Please upload your CV for quick application.</p>
            <a href="/cv-attachment">Manage CV attachment ></a>
        </div>
    </div>
    <div class="profile card shadow-sm p-4 mb-3 bg-white">
        <h4 class="font-weight-bold">Joblinker Profile</h4>
        <p class="mt-2 text-dark">Reach 70% of your profile to start generating your IT professional CV..</p>
        <a href="/profile">Complete your profile ></a>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';
export default {
    name: "UserDashboard",
    computed: {
        ...mapState("auth", ["user"]),
    },
    methods: {
        setDefaultAvatar(event) {
            event.target.src = '/assets/images/default-avatar.jpg';
        },
    }
};
</script>

<style scoped>
.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(242, 242, 243);
    padding: 20px 5px;
    border-radius: 10px;
}

.email {
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
}
</style>
