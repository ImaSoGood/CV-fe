<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getResumeData } from '@/api/apiRoutes'
import { store } from '@/stores/store'
import type { FullResume } from '@/types/resume'

const loading = ref(false)
const error = ref<string | null>(null)
const resumeData = computed(() => store.resumeData)
</script>

<template>
    <div class="cv-container">
        <div v-if="loading" class="loading">Загрузка...</div>
        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <!--<button @click="fetchResumeData">Повторить</button>-->
        </div>
        <div v-else-if="resumeData" class="cv-content">
            <h1>Experience</h1>

            <div v-for="(item, index) in resumeData.resume" :key="index" class="resume-item">
                <div class="item-period">
                    {{ item.period }}
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <h2>{{ item.company }}</h2>
                        <h3>{{ item.position }}</h3>
                    </div>

                    <p>{{ item.description }}</p>

                    <ul v-if="item.works && item.works.length">
                        <li v-for="(work, idx) in item.works" :key="idx">{{ work }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cv-container {
    max-width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
}

.loading {
    text-align: center;
    padding: 60px 0;
    color: #666;
}

.error {
    text-align: center;
    padding: 60px 0;
}

.error button {
    padding: 8px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cv-content h1 {
    color: black;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #040404;
}

.resume-item {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.item-period {
    flex: 0 0 150px;
    font-weight: 500;
    color: #000000;
}

.item-content {
    flex: 1;
}

.resume-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.item-header {
    margin-bottom: 10px;
}

.item-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
}

.item-header h3 {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin: 0;
}

.resume-item p {
    color: #444;
    line-height: 1.6;
    margin: 10px 0 12px 0;
}

.resume-item ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.resume-item ul li {
    padding: 6px 0 6px 20px;
    position: relative;
    color: #555;
    font-size: 14px;
}

.resume-item ul li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #000000;
    font-weight: bold;
}

@media (max-width: 600px) {
    .cv-container {
        padding: 20px 15px;
    }

    .cv-content h1 {
        font-size: 24px;
    }

    .item-header h2 {
        font-size: 18px;
    }

    .resume-item {
        flex-direction: column;
        gap: 8px;
    }
}
</style>