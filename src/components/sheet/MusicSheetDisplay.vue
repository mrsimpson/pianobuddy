<template>
  <div class="music-sheet-display">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div ref="containerRef" class="sheet-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const props = defineProps<{
  xmlContent: string;
}>();

const containerRef = ref<HTMLElement | null>(null);
const error = ref<string>('');
let osmd: OpenSheetMusicDisplay | null = null;

const initializeOSMD = async () => {
  if (!containerRef.value) return;
  
  if (osmd) {
    osmd.clear();
  }
  
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
  } catch (err) {
    console.error('Error rendering score:', err);
    error.value = 'Error rendering the music sheet. Please check if the MusicXML is valid.';
  }
};

const handleResize = async () => {
  await initializeOSMD();
  await renderScore();
};

// Debounce the resize handler to avoid too many re-renders
const debouncedResize = () => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(handleResize, 150);
  };
};

onMounted(async () => {
  await initializeOSMD();
  await renderScore();
  window.addEventListener('resize', debouncedResize());
});

onUnmounted(() => {
  if (osmd) {
    osmd.clear();
  }
  window.removeEventListener('resize', debouncedResize());
});

watch(() => props.xmlContent, async () => {
  await initializeOSMD();
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