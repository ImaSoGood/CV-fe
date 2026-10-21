<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
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

/* ---------- модальное окно ---------- */
const activeProject = ref<Project | null>(null)

const openProject = (project: Project) => {
    if (moved) return // не открываем после drag
    activeProject.value = project
}

const closeProject = () => {
    activeProject.value = null
}

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && activeProject.value) closeProject()
}

watch(activeProject, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <div v-if="projects.length" class="cards" ref="containerRef" @mousedown="onMouseDown"
        @click.capture="onClickCapture">
        <article v-for="project in projects" :key="project.name" class="card" @click="openProject(project)">
            <img v-if="project.picture_url" class="card-image" :src="project.picture_url" :alt="project.name"
                loading="lazy" draggable="false" />
            <div v-else class="card-image card-image--placeholder" aria-hidden="true"></div>

            <div class="card-body">
                <h3 class="card-title">{{ project.name }}</h3>
                <p class="card-text">{{ project.text }}</p>
            </div>
        </article>
    </div>

    <!-- Модальное окно -->
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="activeProject" class="modal-backdrop" @click.self="closeProject">
                <div class="modal" role="dialog" aria-modal="true" :aria-label="activeProject.name">
                    <button class="modal-close" @click="closeProject" aria-label="Закрыть">×</button>

                    <img v-if="activeProject.picture_url" class="modal-image" :src="activeProject.picture_url"
                        :alt="activeProject.name" />
                    <div v-else class="modal-image modal-image--placeholder" aria-hidden="true"></div>

                    <div class="modal-body">
                        <h2 class="modal-title">{{ activeProject.name }}</h2>
                        <p class="modal-text">{{ activeProject.text }}</p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
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
    scrollbar-width: none;
    -ms-overflow-style: none;
    scrollbar-color: #d0d8e0 transparent;

    cursor: pointer;
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

    /* ограничение по строкам */
    display: -webkit-box;
    -webkit-line-clamp: 4;
    /* максимум 3 строки */
    -webkit-box-orient: vertical;
    overflow: hidden;
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

.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(15, 23, 33, 0.45);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}

.modal {
    position: relative;
    width: 100%;
    max-width: 720px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    animation: modal-in 0.25s ease;
}

.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #1a1a1a;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: background 0.2s;
}

.modal-close:hover {
    background: #ffffff;
}

.modal-image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: #f0f4f9;
}

.modal-image--placeholder {
    background: linear-gradient(135deg, #f0f4f9 0%, #e8ecf1 100%);
}

.modal-body {
    padding: 24px 28px 28px;
}

.modal-title {
    margin: 0 0 12px;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
    color: #1a1a1a;
}

.modal-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #4a5a6a;
    overflow-wrap: anywhere;
}

/* Анимация появления */

@keyframes modal-in {
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@media (max-width: 600px) {
    .modal-backdrop {
        padding: 12px;
    }

    .modal-body {
        padding: 18px 20px 22px;
    }

    .modal-title {
        font-size: 19px;
    }

    .modal-text {
        font-size: 14px;
    }
}
</style>