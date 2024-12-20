<template>
  <div class="app">
    <Navigation />
    <main class="main-content container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from './components/layout/Navigation.vue';
</script>

<style>
@import './styles/theme.css';
@import './styles/breakpoints.css';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 64px;
  width: var(--container-width);
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 56px;
  }
}
</style>