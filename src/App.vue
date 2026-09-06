<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <RouterView /> <!-- ← Добавьте это вместо AppFooter -->
    </main>
    <AppFooter /> <!-- ← AppFooter перенесите сюда, вне main -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: #f5f7fa;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: hidden;
}

/* Основной контент */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
}

.content-wrapper {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8ecf1;
}

.content-wrapper h1 {
  font-size: 32px;
  color: #1a2a3a;
  margin-bottom: 12px;
}

.content-wrapper p {
  font-size: 18px;
  color: #5a6c7d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 24px;
  }

  .content-wrapper h1 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 16px;
  }
}
</style>