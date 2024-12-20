<template>
  <div class="tempo-control">
    <div class="tempo-input">
      <label for="tempo">{{ t('playback.tempo') }}:</label>
      <input
        id="tempo"
        v-model="localTempo"
        max="240"
        min="30"
        type="number"
        step="1"
        @change="updateTempo"
      />
      <span>{{ t('playback.bpm') }}</span>
    </div>

    <select class="tempo-preset" @change="handlePresetChange">
      <option value="">{{ t('playback.presets.label') }}</option>
      <option value="40">{{ t('playback.presets.slow') }}</option>
      <option value="80">{{ t('playback.presets.medium') }}</option>
      <option value="120">{{ t('playback.presets.fast') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  tempo: number;
  onTempoChange: (tempo: number) => void;
}>();

const localTempo = ref(props.tempo);

watch(
  () => props.tempo,
  (newTempo) => {
    localTempo.value = newTempo;
  },
);

const updateTempo = () => {
  const tempo = Math.max(30, Math.min(240, localTempo.value));
  props.onTempoChange(tempo);
};

const handlePresetChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (value) {
    localTempo.value = parseInt(value, 10);
    updateTempo();
  }
};
</script>

<style scoped>
.tempo-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.tempo-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.tempo-input input {
  width: 70px;
  padding: var(--spacing-sm);
  border: 1px solid #ddd;
  border-radius: var(--radius-sm);
  text-align: center;
}

.tempo-preset {
  padding: var(--spacing-sm);
  border: 1px solid #ddd;
  border-radius: var(--radius-sm);
  background: white;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text);
}

@media (max-width: 600px) {
  .tempo-control {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .tempo-preset {
    width: 100%;
  }
}
</style>
