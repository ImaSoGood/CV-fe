<script setup lang="ts">
import type { Technology } from '@/types/work'

defineProps<{
    items: Technology[]
}>()
</script>

<template>
    <div v-if="items.length" class="tech-grid">
        <div v-for="item in items" :key="item.title" class="tech-card">
            <h2 class="tech-title">{{ item.title }}</h2>

            <div v-if="item.items.length" class="tags">
                <span v-for="tech in item.items" :key="tech" class="tag">
                    {{ tech }}
                </span>
            </div>

            <p class="tech-description">{{ item.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.tech-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
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

.tech-title {
    margin: 0;
    color: #1a1a1a;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background: #f0f4f9;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 14px;
    color: #1a1a1a;
    border: 1px solid #e8ecf1;
}

.tech-description {
    margin: 0;
    color: #4a5a6a;
    line-height: 1.6;
    font-size: 14px;
    overflow-wrap: anywhere;
}
</style>