<template>
  <div class="music-sheet-display">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div ref="container" class="sheet-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const props = defineProps<{
  xmlContent: string;
}>();

const container = ref<HTMLDivElement | null>(null);
const error = ref<string>('');
let osmd: OpenSheetMusicDisplay | null = null;

const initializeOSMD = async () => {
  if (!container.value) return;
  
  osmd = new OpenSheetMusicDisplay(container.value, {
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

onMounted(async () => {
  await initializeOSMD();
  await renderScore();
});

watch(() => props.xmlContent, async () => {
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
}

.sheet-container {
  width: 100%;
  min-height: 200px;
  overflow-x: auto;
}

.error-message {
  color: var(--danger);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: #fee;
  border-radius: var(--radius-sm);
  text-align: center;
}
</style>