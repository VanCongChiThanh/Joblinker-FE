<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid">
        <SideBar class="sidebar" />
        <div class="content">
            <router-view />
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import SideBar from '@/components/client/SidebarDashboard.vue';
import NavBar from '../components/client/NavBar.vue';
import Footer from '@/components/client/SiteFooter.vue';
export default {
    name: "UserDashboard",
    components: {
        SideBar,
        NavBar,
        Footer,
    },
};
</script>

<style scoped>
.container-fluid {
    padding: 100px 30px 100px 30px;
    display: flex;
    height: 100%;
    background-color: #f1f1f1;
}

.sidebar {
    width: 250px;
    height: 100%;
    background-color: #f8f9fa;
    border-right: 1px solid #ddd;
    position: sticky;
    top: 100px;
    border-radius: 10px;
}

.content {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    background-color: #f1f1f1;
    margin: 0 30px;
}

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }

    .container-fluid {
        padding: 100px 0px;
    }

    .content {
        margin: 0;
    }
}
</style>
