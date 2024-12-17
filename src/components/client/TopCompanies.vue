<template>
<div class="container mb-3">
    <swiper :slidesPerView="3" :spaceBetween="30" :loop="true" :pagination="{
      clickable: true,
    }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="company in displayedCompanies" :key="company.id">
            <div class="card h-100 shadow-sm border d-flex flex-column space-between text-center pt-3">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="logo-container d-flex justify-content-center align-items-center border rounded" style="width: 10vw; height: 10vw; max-width: 80px; max-height: 80px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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
        </swiper-slide>
    </swiper>
</div>
</template>

<script>
import {
    defineComponent
} from "vue";
import {
    fetchTopCompanies
} from "@/services/companyService";
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/pagination';
import {
    Pagination,
} from 'swiper/modules';

export default defineComponent({
    name: "TopCompanies",
    components: {
        Swiper,
        SwiperSlide
    },
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
    setup() {
        return {
            modules: [Pagination],
        };
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
    border: px solid rgba(2, 2, 2, 1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-image: url('https://itviec.com/assets/homepage/bg-top-emp-dbf208a6c6d014eb0e2aac10d0a397aac71694c28d5d23cb5709b613bf215fcb.svg');
    background-size: cover;
    background-position: center;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 8px 12px 30px rgb(0, 0, 0);
}

.logo {
    max-height: 150px;
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

</style>
