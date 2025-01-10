<template>
<div class="job-detail bg-white rounded shadow-sm p-3">
    <main-info>
        <div class="row align-items-center">
            <div class="col-md-3">
                <img :src="`http://localhost:8080/storage/companyLogo/${job.company.logo}`" class="logo mr-2 rounded img-fluid" alt="Company Logo" style="height: auto; max-width: 100%;" />
            </div>

            <div class="col-md-9 d-flex flex-column justify-content-between">

                <h4 class="font-weight-bold mb-2" style="font-size: 1.25rem; color: #333;">
                    <router-link :to="{ name: 'job-detail', params: { id: job.id } }">
                        {{ job.name }}
                    </router-link>
                </h4>
                <a href="#" class="text-dark mb-2" style="font-size: 1.1rem;">{{ job.company.name }}</a>

                <div class="salary d-flex align-items-center">
                    <i class="fa-solid fa-dollar-sign text-dark" style="font-size: 1.5rem;"></i>
                    <a href="#" class="d-block text-primary ml-2" style="font-size: 1.1rem;">Log in to see the salary</a>
                </div>
            </div>
        </div>

        <button class="btn btn-primary w-100 mt-3" style="font-size: 1.1rem; padding: 6px 0;">
            Apply now
        </button>
    </main-info>
    <div class="details p-3" style="max-height: 300px; overflow-y: auto;">
        <div class="location mb-2">
            <i class="fas fa-location-dot mr-2"></i>{{ job.company.address }}
        </div>

        <p><strong><i class="fa-regular fa-clock mr-2"></i></strong>{{ timeAgo(job.createdAt) }}</p>
        <div class="skills d-flex flex-wrap">
            <span class="mr-2"><strong>Skills:</strong></span>
            <button v-for="skill in job.skills" :key="skill.id" class="btn btn-light border-dark text-dark rounded-pill mr-2 mb-2" style="font-size: 0.7rem; padding: 0.2rem 0.3rem;">
                {{ skill.name }}
            </button>
        </div>
        <div class="section-divider"></div>
        <p><strong>Description:</strong> {{ job.description }}</p>
    </div>

</div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
    name: 'JobDetail',
    props: {
        job: {
            type: Object,
            required: true,
        }
    },
    methods: {
        timeAgo(date) {
            return dayjs(date).fromNow();
        }
    }
}
</script>

<style>
.job-detail {
    max-width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
}

.job-detail h3 {
    margin-bottom: 10px;
}

.job-detail p {
    margin: 5px 0;
}

.section-divider {
    border-top: 1px dashed #e0e0e0;
    margin: 0.5rem 0;
}
</style>
