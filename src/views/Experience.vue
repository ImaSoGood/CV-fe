<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/stores/store'
import TitledTextComponent from '@/components/TitledTextComponent.vue'

const experience = computed(() => store.experienceData)
</script>

<template>
    <div class="experience-container">
        <h1>Experience</h1>

        <div v-if="!experience.experience?.length" class="loading">Loading...</div>
        <TitledTextComponent v-else :items="experience.experience" />
    </div>
</template>

<style scoped>
.experience-container {
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
    .experience-container {
        padding: 20px 15px;
    }

    h1 {
        font-size: 24px;
    }
}
</style>