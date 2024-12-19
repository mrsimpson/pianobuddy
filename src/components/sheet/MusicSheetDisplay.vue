<template>
  <div class="music-sheet-display">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div 
      ref="containerRef"
      class="sheet-container"
      :style="{ 
        transform: `scale(${scaleFactor})`,
        width: `${100 / scaleFactor}%`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { useMusicSheetSize } from '../../composables/useMusicSheetSize';

const props = defineProps<{
  xmlContent: string;
}>();

const { containerRef, getScaleFactor, updateWidth } = useMusicSheetSize();
const error = ref<string>('');
let osmd: OpenSheetMusicDisplay | null = null;

const scaleFactor = computed(() => getScaleFactor());

const initializeOSMD = async () => {
  if (!containerRef.value) return;
  
  osmd = new OpenSheetMusicDisplay(containerRef.value, {
    autoResize: true,
    drawTitle: false,
    drawSubtitle: false,
    drawComposer: false,
    drawLyricist: false,
    drawCredits: false,
    drawPartNames: true
  });
};

const renderScore = async () => {
  if (!osmd || !props.xmlContent) return;
  
  error.value = '';
  
  try {
    await osmd.load(props.xmlContent);
    await osmd.render();
    updateWidth(); // Update width after rendering
  } catch (err) {
    console.error('Error rendering score:', err);
    error.value = 'Error rendering the music sheet. Please check if the MusicXML is valid.';
  }
};

onMounted(async () => {
  await initializeOSMD();
  await renderScore();
});

watch(() => props.xmlContent, async () => {
  await osmd.rerender();
});

watch(scaleFactor, async () => {
  await renderScore();
});
</script>

<style scoped>
.music-sheet-display {
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
  width: 100%;
}

.sheet-container {
  min-height: 200px;
  transform-origin: top left;
}

.error-message {
  color: var(--danger);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: #fee;
  border-radius: var(--radius-sm);
  text-align: center;
}

@media (max-width: 800px) {
  .music-sheet-display {
    padding: var(--spacing-sm);
  }
}
</style>
