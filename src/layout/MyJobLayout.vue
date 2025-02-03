<template>
  <div>
    <nav class="navbar navbar-light bg-white shadow-sm">
      <ul class="navbar-nav d-flex flex-row ml-4" style="overflow-x:auto;">
        <li class="nav-item mr-3">
          <router-link 
            to="/my-jobs/applied-jobs" 
            class="nav-link" 
            active-class="active"
            exact-active-class="active"
          >
            Applied Jobs
          </router-link>
        </li>
        <li class="nav-item mr-3">
          <router-link 
            to="/my-jobs" 
            class="nav-link" 
            active-class="active"
            exact-active-class="active"
          >
            Saved Jobs
          </router-link>
        </li>
        <li class="nav-item mr-3">
          <router-link 
            to="/my-jobs/recent-viewed-jobs" 
            class="nav-link" 
            active-class="active"
            exact-active-class="active"
          >
            Recent Viewed Jobs
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="content bg-white mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "MyJobs",
};
</script>

<style scoped>
.navbar-nav .nav-link.active {
  text-decoration: underline;
  text-decoration-color: blue; 
  text-underline-offset: 6px;  
  text-decoration-thickness: 3px; 
}
.navbar-nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  font-weight: bold;
}
</style>
