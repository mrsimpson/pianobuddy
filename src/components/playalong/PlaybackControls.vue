<template>
  <div class="playback-controls">
    <div class="controls-wrapper">
      <div class="controls-group">
        <TempoControl :on-tempo-change="updateTempo" :tempo="tempo" />

        <div class="transport-controls">
          <button class="control-button" title="Rewind" @click="rewind">
            ⏮
          </button>
          <button
            class="control-button"
            :title="isPlaying ? 'Pause' : 'Play'"
            @click="togglePlayback"
          >
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="control-button" title="Stop" @click="stop">⏹</button>
        </div>
      </div>

      <div v-if="parts.length > 1" class="part-select">
        <select
          :value="modelValue"
          class="part-select-input"
          @change="handlePartChange"
        >
          <option v-for="part in parts" :key="part.id" :value="part.id">
            {{ part.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { PlaybackService } from '../../services/playbackService';
import type { PartInfo } from '../../types/musicxml';
import TempoControl from './TempoControl.vue';

const props = defineProps<{
  playbackService: PlaybackService;
  modelValue: string;
  parts: PartInfo[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const tempo = ref(60);
const isPlaying = ref(false);

provide('tempo', tempo);

onMounted(() => {
  props.playbackService.onNote((index) => {
    if (index === -1) {
      isPlaying.value = false;
    }
  });
});

const updateTempo = (newTempo: number) => {
  tempo.value = newTempo;
  props.playbackService.setTempo(newTempo);
};

const handlePartChange = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:modelValue', select.value);
};

const togglePlayback = () => {
  if (isPlaying.value) {
    props.playbackService.pause();
  } else {
    props.playbackService.setTempo(tempo.value);
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
</script>

<style scoped>
.playback-controls {
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.controls-wrapper {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.controls-group {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  flex: 2;
  min-width: 300px;
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
  flex: 1;
  margin-left: var(--spacing-lg);
  min-width: 200px;
  max-width: 300px;
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

@media (max-width: 800px) {
  .controls-wrapper {
    flex-direction: column;
  }

  .controls-group {
    flex-direction: column;
    width: 100%;
  }

  .transport-controls {
    justify-content: center;
  }

  .part-select {
    width: 100%;
    max-width: none;
  }
}
</style>
