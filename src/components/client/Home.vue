<template>
  <div>
    <HomeView />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HomeView from "@/views/client/HomePage.vue";

export default defineComponent({ 
  name: "HomePage",
  components: {
    HomeView,
  },
});
</script>
