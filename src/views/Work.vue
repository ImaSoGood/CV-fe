<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/stores/store'
import TitledTextComponent from '@/components/TitledTextComponent.vue'
import TechnologyList from '@/components/TechnologyList.vue'

const work = computed(() => store.workData)
</script>

<template>
    <div class="tech-container">
        <h1>Tech Stack &amp; Tools</h1>

        <div v-if="!work?.technology?.length" class="loading">Loading...</div>

        <TechnologyList v-else :items="work.technology" />

        <TitledTextComponent :items="work?.work ?? []" />
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
    margin-bottom: 30px;
}

@media (max-width: 600px) {
    .tech-container {
        padding: 20px 15px;
    }

    h1 {
        font-size: 24px;
    }
}
</style>