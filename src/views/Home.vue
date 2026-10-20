<script setup lang="ts">
import { store } from '@/stores/store'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCarousel from '@/components/ProjectCarousel.vue'

const owner = computed(() => store.ownerData)
const achievements = computed(() => store.ownerData?.achivements ?? [])
const name = computed(() => owner.value.name.split(' '))
const photo = ref(owner.value.picture_url)

const profile = {
  firstName: name.value[0],
  lastName: name.value[1],
  position: owner.value.position,
  description: owner.value.about,
}

// Вычисляем проекты для главной
const homeProjects = computed(() => {
  const groups = store.groupProjectsData?.groups ?? []
  // Собираем все проекты из всех групп в один массив
  const allProjects = groups.flatMap(g => g.projects)
  // Фильтруем те, у которых show_home === true
  return allProjects.filter(p => p.show_home === true)
})
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="hero-left">
        <h1 class="name">
          <span class="name-line">{{ profile.firstName }}</span>
          <span class="name-line">{{ profile.lastName }}</span>
        </h1>

        <p class="position">{{ profile.position }}</p>

        <p class="description">{{ profile.description }}</p>

        <ul class="achievements">
          <li v-for="item in achievements" :key="item.text" class="achievement">
            <img v-if="item.ico_url" :src="item.ico_url" alt="" class="achievement-icon" />
            <span class="achievement-value">{{ item.caption }}</span>
            <span class="achievement-label">{{ item.text }}</span>
          </li>
        </ul>
      </div>

      <RouterLink to="/cv" class="hero-right" aria-label="Open CV">
        <img class="hero-photo" :src="photo" alt="Фото профиля" />
        <span class="hero-overlay"></span>
        <span class="hero-hint">View CV →</span>
      </RouterLink>
    </section>

    <!-- Нижняя область: Карусель проектов -->
    <section class="home-bottom" v-if="homeProjects.length">
      <h2 class="section-title">Featured Projects</h2>
      <ProjectCarousel :projects="homeProjects" />
    </section>
  </main>
</template>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  display: flex;
  align-items: center;
  gap: 60px;
}

.hero-left {
  flex: 1 1 55%;
  min-width: 0;
}

.name {
  margin: 0 0 16px;
  font-size: clamp(32px, 5.5vw, 54px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #1a1a1a;
}

.name-line {
  display: block;
}

.position {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 500;
  color: #4a5a6a;
}

.description {
  max-width: 52ch;
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.75;
  color: #4a5a6a;
}

.achievements {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 36px;
  margin: 0;
  padding: 24px 0 0;
  list-style: none;
  border-top: 1px solid #e8ecf1;
}

.achievement {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.achievement-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: #1a1a1a;
}

.achievement-label {
  font-size: 13px;
  line-height: 1.4;
  color: #4a5a6a;

  white-space: normal;
  /* перенос разрешён */
  overflow-wrap: anywhere;
  /* длинное слово перенесётся, если не влезет */
}

/* ---------- Картинка ---------- */

.hero-right {
  position: relative;
  display: block;
  flex: 0 1 380px;
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  background: #f0f4f9;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hero-right:hover {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
}

.hero-right:focus-visible {
  outline: 3px solid #007bff;
  outline-offset: 3px;
}

.hero-photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.hero-right:hover .hero-photo {
  transform: scale(1.04);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
}

.hero-right:hover .hero-overlay,
.hero-right:focus-visible .hero-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.hero-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.02em;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-right:hover .hero-hint,
.hero-right:focus-visible .hero-hint {
  opacity: 1;
}

/* ---------- Нижняя область ---------- */

.home-bottom {
  margin-top: 64px;
}

.section-title {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8ecf1;
}

/* ---------- Адаптив ---------- */

@media (max-width: 900px) {
  .hero {
    flex-direction: column-reverse;
    gap: 32px;
    align-items: stretch;
  }

  .hero-right {
    flex: none;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }

  .achievements {
    gap: 20px 28px;
  }
}

@media (max-width: 600px) {
  .home {
    padding: 20px 15px;
  }

  .name {
    font-size: 30px;
  }

  .position {
    font-size: 16px;
  }

  .achievement-value {
    font-size: 22px;
  }

  .home-bottom {
    margin-top: 40px;
  }
}
</style>