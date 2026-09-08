import { createRouter, createWebHistory } from 'vue-router'
import CV from '@/views/CV.vue'
import Work from '@/views/Work.vue'
import Experience from '@/views/Experience.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/work' },
    { path: '/cv', name: 'cv', component: CV },
    { path: '/work', name: 'work', component: Work },
    { path: '/experience', name: 'experience', component: Experience },
  ],
})

export default router
