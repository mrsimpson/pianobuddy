<template>
  <div class="piano-keyboard">
    <div class="keyboard-layout">
      <!-- White keys -->
      <div class="white-keys">
        <PianoKey 
          v-for="key in whiteKeys" 
          :key="key.name"
          :name="key.name"
          :color="key.color"
          :isBlack="false"
        />
      </div>
      <!-- Black keys -->
      <div class="black-keys">
        <PianoKey 
          v-for="key in blackKeys" 
          :key="key.name"
          :name="key.name"
          :isBlack="true"
          :style="{ left: `${key.offset}%` }"
          class="black-key-absolute"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import PianoKey from './PianoKey.vue';
import { pianoKeys } from '../types/piano';
import { AudioService } from '../services/audioService';

const whiteKeys = computed(() => pianoKeys.filter(key => !key.isBlack));
const blackKeys = computed(() => pianoKeys.filter(key => key.isBlack));

// Create and provide the audio service
const audioService = new AudioService();
provide('audioService', audioService);
</script>

<style scoped>
.piano-keyboard {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.keyboard-layout {
  position: relative;
  display: flex;
  flex-direction: column;
}

.white-keys {
  display: flex;
  position: relative;
  z-index: 1;
  gap: 2px;
}

.black-keys {
  position: absolute;
  width: 100%;
  height: 0;
  z-index: 2;
}

.black-key-absolute {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}

/* Add borders to white keys */
.white-keys :deep(.white-key) {
  border: 1px solid #ccc;
  border-bottom-width: 4px;
}

/* Adjust black key positioning */
.black-keys :deep(.black-key) {
  border: 1px solid #000;
  border-bottom-width: 4px;
}
</style>
