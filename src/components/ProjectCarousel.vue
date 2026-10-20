<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import type { Project } from '@/types/projectGroups'

const props = defineProps<{
    projects: Project[]
}>()

/* ---------- drag-to-scroll ---------- */
const containerRef = ref<HTMLElement | null>(null)

let isDown = false
let startX = 0
let startScroll = 0
let moved = false

const onMouseDown = (e: MouseEvent) => {
    const el = containerRef.value
    if (!el) return
    isDown = true
    moved = false
    startX = e.pageX
    startScroll = el.scrollLeft
    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'
}

const onMouseMove = (e: MouseEvent) => {
    if (!isDown || !containerRef.value) return
    const dx = e.pageX - startX
    if (Math.abs(dx) > 3) moved = true
    containerRef.value.scrollLeft = startScroll - dx
}

const onMouseUp = () => {
    if (!containerRef.value) return
    containerRef.value.style.scrollBehavior = 'smooth'
    containerRef.value.style.scrollSnapType = 'x mandatory'
    isDown = false
}

const onClickCapture = (e: MouseEvent) => {
    if (moved) {
        e.preventDefault()
        e.stopPropagation()
    }
}

onMounted(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
    <div v-if="projects.length" class="cards" ref="containerRef" @mousedown="onMouseDown"
        @click.capture="onClickCapture">
        <article v-for="project in projects" :key="project.name" class="card">
            <img v-if="project.picture_url" class="card-image" :src="project.picture_url" :alt="project.name"
                loading="lazy" draggable="false" />
            <div v-else class="card-image card-image--placeholder" aria-hidden="true"></div>

            <div class="card-body">
                <h3 class="card-title">{{ project.name }}</h3>
                <p class="card-text">{{ project.text }}</p>
            </div>
        </article>
    </div>
</template>

<style scoped>
/* Базовые стили карусели (те же, что были в Projects.vue) */
.cards {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% - 2 * 24px) / 3.4);
    gap: 24px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 8px;
    scrollbar-width: thin;
    scrollbar-color: #d0d8e0 transparent;

    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    -webkit-overflow-scrolling: touch;
}

.cards:active {
    cursor: grabbing;
}

.cards::-webkit-scrollbar {
    height: 6px;
}

.cards::-webkit-scrollbar-track {
    background: transparent;
}

.cards::-webkit-scrollbar-thumb {
    background: #d0d8e0;
    border-radius: 3px;
}

.cards::-webkit-scrollbar-thumb:hover {
    background: #b8c2cc;
}

.card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #e8ecf1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
    scroll-snap-align: start;
}

.card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.card-image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    background: #f0f4f9;
    pointer-events: none;
}

.card-image--placeholder {
    background: linear-gradient(135deg, #f0f4f9 0%, #e8ecf1 100%);
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 18px 20px;
}

.card-title {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.35;
    color: #1a1a1a;
}

.card-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #4a5a6a;
    overflow-wrap: anywhere;
}

/* Адаптив для компонента */
@media (max-width: 900px) {
    .cards {
        grid-auto-columns: calc((100% - 24px) / 2.4);
    }
}

@media (max-width: 600px) {
    .cards {
        grid-auto-columns: 82%;
    }
}
</style>