<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { NavItem } from '@/types/common'
import { store } from '@/stores/store'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const ownerData = computed(() => store.ownerData)

onClickOutside(dropdownRef, () => {
    isOpen.value = false
})

const navItems: NavItem[] = [
    { path: '/projects', label: 'Projects' },
    { path: '/work', label: 'Work' },
    { path: '/experience', label: 'Experience' },
    { path: '/home', label: 'Home' },
    { path: '/cv', label: 'CV' },
];
</script>

<template>
    <header class="header">
        <RouterLink to="/home" class="nav-link home-link" active-class="active" aria-label="Home">
            Home
        </RouterLink>

        <nav class="header-center">
            <RouterLink v-for="item in navItems.filter(i => i.path !== '/home')" :key="item.path" :to="item.path"
                class="nav-link" active-class="active">
                {{ item.label }}
            </RouterLink>
        </nav>

        <div ref="dropdownRef" style="position: relative;">
            <button class="btn-links" @click="isOpen = !isOpen">
                Contacts
            </button>
            <div class="dropdown" :class="{ open: isOpen }">
                <a v-for="contact in ownerData?.contacts" :key="contact.platform" :href="contact.link" target="_blank">
                    {{ contact.text }}
                </a>
            </div>
        </div>
    </header>
</template>

<style scoped>
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

.home-link {
    flex-shrink: 0;
}

.header-center {
    display: flex;
    gap: 6px;
    flex: 1;
    justify-content: center;
    padding: 0 20px;
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

.nav-link.active {
    background: #e8edf5;
    color: #2c3e50;
    font-weight: 600;
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

.dropdown a {
    display: block;
    padding: 8px 14px;
    color: #2c3e50;
    text-decoration: none;
    font-size: 14px;
    border-radius: 6px;
    transition: background 0.15s;
}

.dropdown a:hover {
    background: #f0f4f9;
}

@media (max-width: 768px) {
    .header {
        flex-wrap: wrap;
        height: auto;
        padding: 12px 20px;
        gap: 12px;
    }

    .header-center {
        flex-wrap: wrap;
        width: 100%;
        gap: 4px;
        padding: 0;
        justify-content: center;
    }

    .nav-link {
        padding: 6px 14px;
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 10px 12px;
    }

    .nav-link {
        padding: 5px 10px;
        font-size: 12px;
    }
}
</style>