<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-4 col-sm-6 mb-4" v-for="company in displayedCompanies" :key="company.id">
            <div class="card h-100 shadow-sm border-0 d-flex flex-column justify-content-between text-center p-3">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="logo-container d-flex justify-content-center align-items-center border rounded" style="width: 10vw; height: 10vw; max-width: 80px; max-height: 80px;">
                        <img :src="`http://localhost:8080/storage/companyLogo/${company.logo}`" alt="Company Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                    </div>
                </div>
                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                    <h5 class="card-title font-weight-bold">{{ company.name }}</h5>
                    <p class="font-weight-bold text-primary mb-0">
                        <a href="#" class="text-decoration-none">
                            {{ company.jobsCount || 20 }} Jobs
                            <i class="fa-solid fa-angles-right"></i>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center mt-4">
        <button class="btn custom-blue-btn">Show More Companies</button>
    </div>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { fetchTopCompanies } from "@/services/companyService";

export default defineComponent({
  name: "CompanyList",
  data() {
    return {
      isLoading: false,
      displayedCompanies: [], 
    };
  },
  methods: {
    async fetchCompanies() {
      if (this.isLoading) return; 
      this.isLoading = true;
      try {
        const response = await fetchTopCompanies();
        if (response.statusCode === 200 && response.data) {
          this.displayedCompanies = response.data; 
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching top companies:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchCompanies(); 
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.logo {
    max-height: 150px;
}

.card-title {
    font-size: 1.25rem;
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
</style>
