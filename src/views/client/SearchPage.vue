<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid">
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import NavBar from "@/components/client/NavBar.vue";
import Footer from "@/components/client/SiteFooter.vue";
export default {
    name: "LoginPage",
    components: {
        NavBar,
        Footer
    },
};
</script>