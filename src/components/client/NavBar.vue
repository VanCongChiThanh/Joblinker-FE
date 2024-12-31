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
                    <a class="nav-link" href="#">All Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">IT Companies</a>
                </li>
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <template v-if="isAuthenticated">
                    <div class="nav-item d-flex align-items-center">
                        <img :src="`http://localhost:8080/storage/avatar/${user.email}`+'.jpg'" style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%;" />
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle mx-2 text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{{ user.name }}</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Dashboard</a>
                                <a class="dropdown-item" href="#" @click="handleLogout">Sign out</a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <router-link to="/login" class="text-white">
                        Login / Sign up
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    name: "NavBar",
    computed: {
        ...mapState(["status", "user"]),
        isAuthenticated() {
            return this.status.loggedIn;
        },
    },
    methods: {
        handleLogout() {
            this.$store.dispatch("logout");
            this.$router.push("/"); 
        },
    },
    created() {
        this.$store.dispatch("checkAuthentication");
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
    color: #ffffff !important;
    font-weight: bold;
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
