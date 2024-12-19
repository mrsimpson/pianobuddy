<template>
  <div class="music-sheet">
    <h2 v-if="title" class="sheet-title">{{ title }}</h2>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div ref="container" class="sheet-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const props = defineProps<{
  title?: string;
  xmlContent: string;
}>();

const container = ref<HTMLDivElement | null>(null);
const error = ref<string>('');
let osmd: OpenSheetMusicDisplay | null = null;

const initializeOSMD = async () => {
  if (!container.value) return;
  
  osmd = new OpenSheetMusicDisplay(container.value, {
    autoResize: true,
    drawTitle: true,
    drawSubtitle: true,
    drawComposer: false,
    drawLyricist: false,
    drawCredits: false,
    drawPartNames: false
  });
};

const validateXmlContent = (content: string): boolean => {
  // Check if content starts with XML declaration
  if (!content.trim().startsWith('<?xml')) {
    error.value = 'Invalid MusicXML: Missing XML declaration';
    return false;
  }

  // Basic structure validation
  if (!content.includes('<score-partwise')) {
    error.value = 'Invalid MusicXML: Missing score-partwise element';
    return false;
  }

  return true;
};

const renderScore = async () => {
  if (!osmd || !props.xmlContent) return;
  
  error.value = '';
  
  try {
    if (!validateXmlContent(props.xmlContent)) {
      return;
    }

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
.music-sheet {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.sheet-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.sheet-container {
  width: 100%;
  min-height: 200px;
  overflow-x: auto;
}

.error-message {
  color: #dc3545;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fee;
  border-radius: 4px;
  text-align: center;
}
</style>