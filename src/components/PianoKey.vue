<template>
  <div
    :class="{ 'black-key': isBlack, 'white-key': !isBlack, active: isPressed }"
    class="piano-key"
    :style="getKeyStyle"
    @mousedown="playNote"
    @mouseup="stopNote"
    @mouseleave="stopNote"
    @touchstart.prevent="playNote"
    @touchend.prevent="stopNote"
  >
    <div class="key-label">{{ displayName }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import type { AudioService } from '../services/audio';
import { getPianoKeyDisplayName } from '../types/piano';
import { usePianoKey } from '../composables/usePianoKey';

const props = defineProps<{
  name: string;
  isBlack: boolean;
  color?: string;
  pitch: string;
  octave: number;
}>();

const audioService = inject<AudioService>('audioService');
const isPressed = ref(false);

const { getKeyStyle } = usePianoKey(props);

const displayName = computed(() => {
  return getPianoKeyDisplayName({ name: props.name, isBlack: props.isBlack });
});

const playNote = () => {
  isPressed.value = true;
  audioService?.playNote(props.pitch, props.octave, 0.5); // Default to octave 4 and 0.5s duration
};

const stopNote = () => {
  isPressed.value = false;
};
</script>

<style scoped>
.piano-key {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  user-select: none;
  border-radius: 0 0 4px 4px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.white-key {
  background: white;
  height: 300px;
  width: 80px;
  z-index: 1;
  border: 1px solid #ccc;
  border-bottom-width: 4px;
}

.black-key {
  background: #333;
  height: 150px;
  width: 40px;
  z-index: 2;
  border: 1px solid #000;
  border-bottom-width: 4px;
}

.key-label {
  position: absolute;
  bottom: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #000;
}

.black-key .key-label {
  color: #fff;
}

.active {
  transform: translateY(2px);
}

.white-key.active {
  background-color: #f0f0f0;
}

.black-key.active {
  background-color: #222;
}
</style>
