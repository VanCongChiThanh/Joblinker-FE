<template>
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container p-1 mr-2">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
            <div class="site-logo col-6">
                <router-link to="/" class="text-light">JobLinker</router-link>
            </div>
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item ">
                    <a class="nav-link" href="/search">All Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">IT Companies</a>
                </li>
            </ul>
            <router-link to="/" class="text-white mr-2">For Employers</router-link>
            <div class="form-inline my-2 my-lg-0">
                <template v-if="isAuthenticated">
                    <div class="nav-item d-flex align-items-center">
                        <div style="width: 2.7rem; height: 2.7rem; border-radius: 50%; background: linear-gradient(45deg, #ff6b6b, #f5a623, #27ae60, #3498db); padding: 0.1rem;">
                            <img :src="`http://localhost:8080/storage/avatar/${user.email}.jpg`" @error="setDefaultAvatar" style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; background-color: white;" />

                        </div>

                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle mx-2 text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{{ user.name }}</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="/dashboard"><i class="fas fa-th-large mr-1"></i>Dashboard</a>
                                <a class="dropdown-item" href="#"><i class="fas fa-suitcase mr-1"></i>My jobs</a>
                                <a class="dropdown-item" href="#"><i class="fa-solid fa-inbox mr-1"></i>Job Invitation</a>
                                <a class="dropdown-item" href="#"><i class="fa-regular fa-envelope mr-1"></i>Email Subscriptions</a>
                                <a class="dropdown-item" href="#" @click="handleLogout"><i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>Sign out</a>
                            </div>

                        </div>
                    </div>
                </template>
                <template v-else>
                    <router-link to="/login" class="text-white mr-2">
                        Sign in / Sign up
                    </router-link>
                </template>
            </div>
            <div class="language">
                <span class="text-white">EN</span> | VI
            </div>
        </div>
    </div>
</nav>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";

export default {
    name: "NavBar",
    computed: {
        ...mapState("auth", ["status", "user"]),
        isAuthenticated() {
            return this.status.loggedIn && this.user !== null;
        },
    },
    methods: {
        ...mapActions("auth", ["logout", "checkAuthentication"]),
        async handleLogout() {
            try {
                await this.logout();
                this.$router.push("/");
            } catch (error) {
                console.error("Logout failed:", error);
                alert("Failed to log out. Please try again.");
            }
        },
        setDefaultAvatar(event) {
            event.target.src = 'http://localhost:8080/storage/avatar/default-avatar.jpg';
        },
    },
    async created() {
        try {
            await this.checkAuthentication();
        } catch (error) {
            console.error("Failed to check authentication:", error);
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped>
.site-logo {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease-in-out;
}

.navbar {
    background-color: rgba(0, 34, 66, 0.8);
    border-bottom: 0.5px solid #202166;
}

.nav-link {
    color: #89898a !important;
    font-weight: bold;
}

.nav-link:hover {
    color: white !important;
}

.navbar-toggler-icon {
    background-color: #ffffff;
}

.btn-light {
    color: #ffffff;
    font-weight: bold;
    text-transform: uppercase;
}

.nav-item img {
    cursor: pointer;
}
</style>
