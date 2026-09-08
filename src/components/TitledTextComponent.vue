<script setup lang="ts">
import type { TitledText } from '@/types/common'

defineProps<{
    items: TitledText[]
}>()
</script>

<template>
    <div v-if="items.length" class="work-text">
        <div v-for="(item, index) in items" :key="index" class="work-block">
            <h2>{{ item.title }}</h2>
            <p v-html="item.text"></p>
        </div>
    </div>
</template>

<style scoped>
.work-text {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid #e8ecf1;
}

.work-block {
    margin-bottom: 32px;
}

.work-block:last-child {
    margin-bottom: 0;
}

.work-block h2 {
    color: #1a1a1a;
    font-size: 24px;
    margin-bottom: 12px;
}

.work-block p {
    color: #4a5a6a;
    line-height: 1.8;
    font-size: 16px;
}
</style>