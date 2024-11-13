<template>
    <div class="job-preview bg-white rounded shadow-sm p-3">
        <h3>{{ job.name }}</h3>
        <p><strong>Company:</strong> {{ job.company.name }}</p>
        <p><strong>Location:</strong> {{ job.location }}</p>
        <p><strong>Salary:</strong> ${{ job.salary.toLocaleString() }}</p>
        <p><strong>Description:</strong> {{ job.description }}</p>
        <p><strong>Level:</strong> {{ job.level }}</p>
        <p><strong>Posted:</strong> {{ timeAgo(job.createdAt) }}</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
    name: 'JobPreview',
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
.job-preview {
    max-width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
}

.job-preview h3 {
    margin-bottom: 10px;
}

.job-preview p {
    margin: 5px 0;
}
</style>
