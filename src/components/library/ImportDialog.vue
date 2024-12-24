<template>
  <div v-if="isOpen" class="import-dialog">
    <div class="dialog-overlay" @click="close"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <h2>{{ t('import.title') }}</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>

      <div class="dialog-body">
        <div
          :class="{ dragging: isDragging }"
          class="file-drop-zone"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @dragenter.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
        >
          <div class="drop-zone-content">
            <span class="icon">📄</span>
            <p>{{ t('import.dropzone.text') }}</p>
            <p>{{ t('import.dropzone.or') }}</p>
            <label class="file-input-label">
              {{ t('import.dropzone.button') }}
              <input
                accept=".xml,.musicxml,.mxl"
                type="file"
                class="file-input"
                @change="handleFileSelect"
              />
            </label>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="selectedFile" class="selected-file">
          <p>{{ t('import.selectedFile') }}: {{ selectedFile.name }}</p>
          <input
            v-model="songName"
            type="text"
            :placeholder="t('import.nameInput')"
            class="song-name-input"
          />
        </div>
      </div>

      <div class="dialog-footer">
        <button class="cancel-button" @click="close">
          {{ t('import.buttons.cancel') }}
        </button>
        <button
          class="import-button"
          :disabled="!canImport"
          @click="importFile"
        >
          {{ t('import.buttons.import') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { MusicXmlService } from '../../services/musicXmlService';
import { SongService } from '../../services/songService';

const { t } = useI18n();

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'imported'): void;
}>();

const isDragging = ref(false);
const selectedFile = ref<File | null>(null);
const songName = ref('');
const error = ref('');

const musicXmlService = new MusicXmlService();

const canImport = computed(
  () => selectedFile.value && songName.value.trim() && !error.value,
);

const close = () => {
  selectedFile.value = null;
  songName.value = '';
  error.value = '';
  emit('close');
};

const validateFile = async (file: File) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (!['xml', 'musicxml', 'mxl'].includes(fileExtension || '')) {
    throw new Error(
      'Please select a valid MusicXML file (.xml, .mxl or .musicxml)',
    );
  }

  let xmlContent: string;
  if (fileExtension === 'mxl') {
    xmlContent = await musicXmlService.unzipMxlFile(file);
  } else {
    xmlContent = await file.text();
  }

  const validation = musicXmlService.validateXml(xmlContent);

  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid MusicXML file');
  }

  return xmlContent;
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input?.files?.length) return;

  try {
    const file = input.files[0];
    await validateFile(file);
    selectedFile.value = file;
    songName.value = file.name.replace(/\.(xml|musicxml|mxl)$/, '');
    error.value = '';
  } catch (err: any) {
    error.value = err.message;
    selectedFile.value = null;
    songName.value = '';
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files[0];
  if (!file) return;

  try {
    await validateFile(file);
    selectedFile.value = file;
    songName.value = file.name.replace(/\.(xml|musicxml|mxl)$/, '');
    error.value = '';
  } catch (err: any) {
    error.value = err.message;
    selectedFile.value = null;
    songName.value = '';
  }
};

const importFile = async () => {
  if (!selectedFile.value || !songName.value.trim()) return;

  try {
    const formattedXml = await validateFile(selectedFile.value);

    const song = {
      name: songName.value.trim(),
      xmlContent: formattedXml,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await SongService.saveSong(song);
    emit('imported');
    close();
  } catch {
    error.value = 'Failed to import file. Please try again.';
  }
};
</script>

<style scoped>
.import-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: relative;
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  z-index: 1001;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.dialog-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.dialog-body {
  padding: 1.5rem;
}

.file-drop-zone {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.file-drop-zone.dragging {
  border-color: #42b883;
  background: #f0f9f4;
}

.drop-zone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.file-input {
  display: none;
}

.file-input-label {
  background: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.file-input-label:hover {
  background: #3aa876;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee;
  color: #dc3545;
  border-radius: 6px;
}

.selected-file {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.song-name-input {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

.cancel-button,
.import-button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-button {
  background: #f8f9fa;
  color: #333;
}

.import-button {
  background: #42b883;
  color: white;
}

.import-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-button:hover {
  background: #e9ecef;
}

.import-button:not(:disabled):hover {
  background: #3aa876;
}
</style>
