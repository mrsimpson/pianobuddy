
<template>
  <div class="playback-controls">
    <div class="left-controls">
      <TempoControl 
        :tempo="tempo"
        :on-tempo-change="updateTempo"
      />
      
      <div class="transport-controls">
        <button 
          class="control-button"
          @click="rewind"
          title="Rewind"
        >
          ⏮
        </button>
        <button 
          class="control-button"
          @click="togglePlayback"
          :title="isPlaying ? 'Pause' : 'Play'"
        >
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button 
          class="control-button"
          @click="stop"
          title="Stop"
        >
          ⏹
        </button>
      </div>
    </div>

    <div class="part-select">
      <select 
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        class="part-select-input"
      >
        <option 
          v-for="part in parts" 
          :key="part.id" 
          :value="part.id"
        >
          {{ part.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { PlaybackService } from '../../services/playbackService';
import type { PartInfo } from '../../types/musicxml';
import TempoControl from './TempoControl.vue';

const { t } = useI18n();

const props = defineProps<{
  playbackService: PlaybackService;
  modelValue: string;
  parts: PartInfo[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const tempo = ref(80); // Default to medium tempo
const isPlaying = ref(false);

const updateTempo = (newTempo: number) => {
  tempo.value = newTempo;
  props.playbackService.setTempo(newTempo);
};

const togglePlayback = () => {
  if (isPlaying.value) {
    props.playbackService.pause();
  } else {
    props.playbackService.play();
  }
  isPlaying.value = !isPlaying.value;
};

const stop = () => {
  props.playbackService.stop();
  isPlaying.value = false;
};

const rewind = () => {
  props.playbackService.stop();
  isPlaying.value = false;
};

onUnmounted(() => {
  props.playbackService.stop();
});
</script>

<style scoped>
.playback-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.left-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.transport-controls {
  display: flex;
  gap: var(--spacing-sm);
}

.control-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--primary);
  color: white;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all var(--transition-normal);
}

.control-button:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.part-select {
  min-width: 200px;
}

.part-select-input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid #ddd;
  border-radius: var(--radius-sm);
  background: white;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text);
}

@media (max-width: 600px) {
  .playback-controls {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .left-controls {
    width: 100%;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .part-select {
    width: 100%;
  }
}
</style>