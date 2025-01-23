<template>
<div class="sidebar">
    <div class="welcome">
        <h6 class="text-dark">👋Welcome</h6>
        <h5 v-if="user" class="text-dark font-weight-bold">{{ user.name }}</h5>
        <h4 v-else class="text-dark font-weight-bold">Guest</h4>

    </div>
    <!-- Sidebar cho USER -->
    <div v-if="user && user.role === 'USER'">
        <ul>
            <li>
                <router-link to="/dashboard" active-class="active"><i class="fas fa-th-large mr-1"></i>Dashboard</router-link>
            </li>
            <li>
                <router-link to="/cv-attachment" active-class="active"><i class="fa-regular fa-file mr-1"></i>CV Attachment</router-link>
            </li>
            <li>
                <router-link to="/profile" active-class="active"><i class="fa-regular fa-user mr-1"></i>Joblinker Profile</router-link>
            </li>
        </ul>
    </div>

    <!-- Sidebar cho EMPLOYER -->
    <div v-if="user && user.role === 'EMPLOYER'">
        <ul>
            <li>
                <router-link to="/employer-dashboard" active-class="active"><i class="fas fa-th-large mr-1"></i>Dashboard</router-link>
            </li>
            <li>
                <router-link to="/company-management" active-class="active"><i class="fa-regular fa-building mr-1"></i>My company</router-link>
            </li>
            <li>
                <router-link to="/job-management" active-class="active"><i class="fas fa-suitcase mr-1"></i>Job Management</router-link>
            </li>
        </ul>
    </div>

    <!-- Sidebar cho SUPER_ADMIN -->
    <div v-if="user && user.role === 'SUPER_ADMIN'">
        <ul>
            <li>
                <router-link to="/admin-dashboard" active-class="active"><i class="fa-regular fa-user-cog mr-1"></i>Admin Dashboard</router-link>
            </li>
            <li>
                <router-link to="/manage-users" active-class="active"><i class="fa-regular fa-users mr-1"></i>Manage Users</router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "SideBar",
    computed: {
        ...mapState("auth", ["user"]),
    },
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #e3f2fd;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

li {
    margin: 15px 0;
}

.router-link-active,
.active {
    background-color: #bbdefb;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px;
    display: block;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.router-link-active:hover,
.active:hover {
    background-color: #90caf9;
    color: #0d47a1;
}

a {
    text-decoration: none;
    color: #0d47a1;
    font-weight: 500;
    transition: color 0.3s ease;
}

a:hover {
    color: #1565c0;
}
</style>
