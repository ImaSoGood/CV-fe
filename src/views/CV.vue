<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/stores/store'

const resumeData = computed(() => store.resumeData)
const cvUrl = computed(() => store.ownerData?.cv_path ?? '')
</script>

<template>
    <div class="cv-container">
        <div v-if="resumeData.resume?.length" class="cv-content">
            <div class="cv-header">
                <h1>Working Experience</h1>
                <a v-if="cvUrl" :href="cvUrl" class="cv-download" download>
                    Download CV
                </a>
            </div>

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

        <div v-else class="loading">Loading...</div>
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

.cv-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #040404;
}

.cv-header h1 {
    margin: 0;
    color: black;
    font-size: 28px;
    font-weight: 600;
}

.cv-download {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    background: #000;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
}

.cv-download:hover {
    background: #373636;
}

.cv-download:active {
    transform: scale(0.96);
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

    .cv-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .cv-header h1 {
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