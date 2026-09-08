<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { store } from '@/stores/store'
import TitledTextComponent from '@/components/TitledTextComponent.vue'

const work = computed(() => store.workData)
</script>

<template>
    <div class="tech-container">
        <h1>Tech Stack & Tools</h1>

        <div v-if="work?.technology.length === 0" class="loading">Загрузка...</div>

        <div v-else class="tech-grid">
            <div v-for="(item, index) in work?.technology" :key="index" class="tech-card">
                <h2>{{ item.title }}</h2>
                <div class="tags">
                    <span v-for="tech in item.items" :key="tech" class="tag">
                        {{ tech }}
                    </span>
                </div>
                <p>{{ item.description }}</p>
            </div>
        </div>

        <TitledTextComponent :items="work.work" />
    </div>
</template>

<style scoped>
.tech-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
}

.loading {
    text-align: center;
    padding: 40px 0;
    color: #666;
}

h1 {
    color: #1a1a1a;
    font-size: 28px;
    font-weight: 600;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 30px;
}

.tech-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8ecf1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s;
}

.tech-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.tech-card h2 {
    color: #1a1a1a;
    font-size: 20px;
    margin-bottom: 8px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0;
}

.tag {
    background: #f0f4f9;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 14px;
    color: #1a1a1a;
    border: 1px solid #e8ecf1;
}

.tech-card p {
    color: #4a5a6a;
    line-height: 1.6;
    margin-top: 8px;
}

.additional-text {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid #e8ecf1;
}

.additional-text h2 {
    color: #1a1a1a;
    font-size: 24px;
    margin-bottom: 12px;
}

.additional-text p {
    color: #4a5a6a;
    line-height: 1.8;
    margin-bottom: 16px;
}
</style>