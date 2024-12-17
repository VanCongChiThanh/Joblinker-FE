<template>
  <div class="container mb-4">
    <swiper
      :slidesPerView="1"
      :spaceBetween="30"
      :loop="true"
      :pagination="{ clickable: true }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <!-- Mỗi slide chứa 6 job -->
      <swiper-slide v-for="(chunk, index) in jobChunks" :key="index">
        <div class="job-container d-flex flex-wrap justify-content-between">
          <div
            v-for="job in chunk"
            :key="job.id"
            class="job-item card h-100 shadow-sm border p-3"
          >
            <div class="d-flex align-items-center">
              <img
                :src="`http://localhost:8080/storage/companyLogo/${job.company.logo}`"
                alt="Company Logo"
                class="img-fluid"
                style="width: 60px; height: 60px; object-fit: contain;"
              />
              <div class="d-flex flex-column ms-2 ml-2" style="width: calc(100% - 100px);">
                <h5 class="text-truncate mb-1">
                  <a href="#" class="font-weight-bold text-dark">{{ job.name }}</a>
                </h5>
                <p class="mb-0 text-truncate" >{{ job.company.name }}</p>
                <p class="salary text-danger mb-0">
                  <i class="fas fa-dollar-sign"></i> {{ job.salary || 'Thương lượng' }}
                </p>
                <div class="location" style="font-size: 0.85rem;">
                  <i class="fas fa-location-dot mr-2"></i>{{ job.location }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import { fetchTopJobs } from "@/services/jobService";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default defineComponent({
  name: "TopJobs",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      isLoading: false,
      displayedJobs: [],
      modules: [Pagination, Navigation],
    };
  },
  computed: {
    jobChunks() {
      const chunkSize = 6;
      const chunks = [];
      for (let i = 0; i < this.displayedJobs.length; i += chunkSize) {
        chunks.push(this.displayedJobs.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  methods: {
    async fetchJobs() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const response = await fetchTopJobs();
        if (response.statusCode === 200 && response.data) {
          this.displayedJobs = response.data;
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching top jobs:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchJobs();
  },
});
</script>


<style scoped>
.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.card {
    border-radius: 12px;
    border: 2px solid rgba(2, 2, 2, 1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 8px 12px 30px rgb(0, 0, 0);
}

.logo-container {
    width: 10vw;
    height: 10vw;
    max-width: 80px;
    max-height: 80px;
    border-radius: 50%;
}

.card-title {
    font-size: 1.1rem;
}

.card-text {
    color: #6c757d;
}

.custom-blue-btn {
    background-color: white;
    color: #007bff;
    border-color: #007bff;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
}

.custom-blue-btn:hover {
    background-color: #007bff;
    color: white;
}
.job-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
}

.job-item {
  flex: 1 1 30%; 
  max-width: 33%; 
  box-sizing: border-box; 
}

@media (max-width: 1024px) {
  .job-item {
    flex: 1 1 40%; 
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  .job-item {
    flex: 1 1 90%; 
    max-width: 99%;
  }
}

</style>
