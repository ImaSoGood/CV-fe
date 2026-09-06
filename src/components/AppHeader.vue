<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { NavItem } from '@/types/common'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
    isOpen.value = false
})

const navItems: NavItem[] = [
    { path: '/', label: 'Work' },
    { path: '/about', label: 'Experience' },
    { path: '/services', label: 'Future' },
    { path: '/cv', label: 'CV' },
];

</script>

<template>
    <header class="header">
        <div class="header-left">
            <span class="text">Vladimir Kovalev</span>
            <span class="position">softwate engineer</span>
        </div>

        <nav class="header-center">
            <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" class="nav-link"
                active-class="active">
                {{ item.label }}
            </RouterLink>
        </nav>

        <div ref="dropdownRef" style="position: relative;">
            <button class="btn-links" @click="isOpen = !isOpen">
                Contacts
            </button>
            <div class="dropdown" :class="{ open: isOpen }">
                <a href="https://linkedin.com" target="_blank">LinkedIn</a>
                <a href="https://github.com" target="_blank">GitHub</a>
                <span class="email">email@example.com</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Хедер на всю ширину без отступов */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 72px;
    width: 100%;
    max-width: 100%;
    background: #ffffff;
    color: #2c3e50;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid #e8ecf1;
    position: sticky;
    top: 0;
    z-index: 100;
    margin: 0;
    box-sizing: border-box;
}

/* Левая часть */
.header-left {
    color: black;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.text {
    font-size: 18px;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -0.3px;
}

.position {
    font-size: 12px;
    background: #eef2f7;
    color: #5a6c7d;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
    border: 1px solid #e0e5ec;
}

/* Центральная часть с кнопками */
.header-center {
    display: flex;
    gap: 6px;
    flex: 1;
    justify-content: center;
    padding: 0 20px;
}

.btn-links {
    background: black;
    border: 1px solid #e0e5ec;
    border-radius: 8px;
    padding: 8px 16px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.btn-links:hover {
    background: #373636;
    border-color: #c0c8d4;
}

/*expandable list style*/
.dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: white;
    border: 1px solid #e8ecf1;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    min-width: 180px;
    padding: 6px;
    display: none;
}

.dropdown.open {
    display: block;
}

.dropdown a,
.dropdown .email {
    display: block;
    padding: 8px 14px;
    color: #2c3e50;
    text-decoration: none;
    font-size: 14px;
    border-radius: 6px;
    transition: background 0.15s;
}

.dropdown a:hover,
.dropdown .email:hover {
    background: #f0f4f9;
}

.dropdown .email {
    cursor: default;
    color: #5a6c7d;
}

.nav-link {
    padding: 8px 24px;
    background: transparent;
    color: #4a5a6a;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-decoration: none;
    position: relative;
}

.nav-link:hover {
    background: #f0f4f9;
    color: #1a2a3a;
}

.nav-link:active {
    transform: scale(0.96);
}

/* Активная кнопка */
.nav-link.active {
    background: #e8edf5;
    color: #2c3e50;
    font-weight: 600;
}

/* Правая часть */
.header-right {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
}

/* Адаптивность */
@media (max-width: 768px) {
    .header {
        flex-wrap: wrap;
        height: auto;
        padding: 12px 20px;
        gap: 12px;
    }

    .header-left {
        width: 100%;
        justify-content: center;
    }

    .header-center {
        flex-wrap: wrap;
        width: 100%;
        gap: 4px;
        padding: 0;
    }

    .nav-link {
        padding: 6px 14px;
        font-size: 13px;
    }

    .header-right {
        display: none;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 10px 12px;
    }

    .text {
        font-size: 18px;
    }

    .nav-link {
        padding: 5px 10px;
        font-size: 12px;
    }
}
</style>