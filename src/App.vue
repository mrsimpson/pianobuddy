<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from './components/layout/Navigation.vue';
</script>

<style>
@import './styles/theme.css';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 64px;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--spacing-lg);
  box-sizing: border-box;
}

@media (max-width: 800px) {
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>