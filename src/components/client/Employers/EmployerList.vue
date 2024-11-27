<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-6 mb-4" v-for="company in displayedCompanies" :key="company.id">
        <div class="card h-100 shadow-sm border-0 d-flex flex-column justify-content-between text-center p-3">
          <div class="d-flex justify-content-center align-items-center">
            <div class="logo-container d-flex justify-content-center align-items-center border rounded" 
                 style="width: 10vw; height: 10vw; max-width: 80px; max-height: 80px;">
              <img 
                :src="`http://localhost:8080/storage/companyLogo/${company.logo}`" 
                alt="Company Logo"
                style="max-width: 100%; max-height: 100%; object-fit: contain;"
              />
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
      <button @click="showMoreCompanies" class="btn btn-primary">Load More</button>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import { fetchCompanies } from "@/services/companyService"; 

export default defineComponent({
  name: "CompanyList",
  data() {
    return {
      displayLimit: 6,  
    };
  },
  computed: {
    ...mapState(["companies"]),  
    displayedCompanies() {
      return this.companies.slice(0, this.displayLimit); 
    },
  },
  methods: {
    ...mapActions(["addCompanies"]), 
    showMoreCompanies() {
      this.displayLimit += 6;  
    },
    async fetchCompanies() {
      try {
        const response = await fetchCompanies(1, this.displayLimit); 
        if (response.statusCode === 200 && response.data && response.data.result) {
          this.addCompanies(response.data.result); 
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
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
  justify-content: space-between; /* Đảm bảo phần trên và dưới có không gian đều */
  flex-grow: 1; /* Phần này chiếm không gian còn lại */
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


</style>
