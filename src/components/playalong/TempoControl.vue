<template>
  <div class="tempo-control">
    <div class="tempo-input">
      <label for="tempo">Tempo:</label>
      <input 
        type="number" 
        id="tempo" 
        v-model="localTempo" 
        min="30" 
        max="240" 
        step="1"
        @change="updateTempo"
      >
      <span>BPM</span>
    </div>
    
    <select 
      class="tempo-preset"
      @change="handlePresetChange"
    >
      <option value="">Preset</option>
      <option value="40">Slow (40 BPM)</option>
      <option value="80">Medium (80 BPM)</option>
      <option value="120">Fast (120 BPM)</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  tempo: number;
  onTempoChange: (tempo: number) => void;
}>();

const localTempo = ref(props.tempo);

watch(() => props.tempo, (newTempo) => {
  localTempo.value = newTempo;
});

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