<script lang="ts" setup>
import { provide } from 'vue';
import Navigation from './components/layout/Navigation.vue';
import { AudioService } from './services/audio';

// Create and provide the audio service
const audioService = new AudioService();
provide('audioService', audioService);
</script>

<template>
  <div class="app">
    <Navigation />
    <main class="main-content container">
      <router-view></router-view>
    </main>
  </div>
</template>

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
