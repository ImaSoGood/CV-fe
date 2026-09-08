import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CV from '@/views/CV.vue'
import Work from '@/views/Work.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cv', name: 'cv', component: CV },
    { path: '/work', name: 'work', component: Work },
  ],
})

export default router
