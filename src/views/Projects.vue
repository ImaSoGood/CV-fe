<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/stores/store'
import ProjectCarousel from '@/components/ProjectCarousel.vue'

const groups = computed(() => store.groupProjectsData?.groups ?? [])
</script>

<template>
    <main class="projects">
        <h1>Projects</h1>

        <div v-if="!groups.length" class="loading">Загрузка...</div>

        <div v-else class="groups">
            <section v-for="group in groups" :key="group.name" class="group">
                <header class="group-header">
                    <h2>{{ group.name }}</h2>
                    <p class="group-subtitle">{{ group.header }}</p>
                    <p class="group-text">{{ group.text }}</p>
                </header>

                <ProjectCarousel :projects="group.projects" />
            </section>
        </div>
    </main>
</template>

<style scoped>
.projects {
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
    margin-bottom: 30px;
}

/* ---------- Группа ---------- */

.group {
    margin-bottom: 48px;
}

.group:last-child {
    margin-bottom: 0;
}

.group-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8ecf1;
}

.group-header h2 {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
}

.group-subtitle {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 500;
    color: #4a5a6a;
}

.group-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #4a5a6a;
}

/* ---------- Адаптив ---------- */

@media (max-width: 600px) {
    .projects {
        padding: 20px 15px;
    }

    h1 {
        font-size: 24px;
    }

    .group-header h2 {
        font-size: 20px;
    }
}
</style>