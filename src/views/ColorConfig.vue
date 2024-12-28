<template>
  <div class="color-config">
    <PageHeader :title="t('colorConfig.title')" />
    <div class="keyboard-container">
      <PianoKeyboard />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../components/layout/PageHeader.vue'
import PianoKeyboard from '../components/piano/PianoKeyboard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.color-config {
  padding: var(--spacing-lg);
}

.keyboard-container {
  margin: var(--spacing-xl) auto;
  max-width: 800px;
  background: var(--light);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
</style>
