<template>
  <div class="song-visualizer">
    <div class="screen-only">
      <PageHeader :title="currentSong?.name || t('common.loading')">
        <template #actions>
          <button
            :disabled="!isSheetRendered"
            class="btn btn-primary"
            @click="handlePrintScore"
          >
            {{ t('common.print') }}
          </button>
          <router-link v-if="isMobile" class="btn btn-secondary" to="/library">
            {{ t('common.backToLibrary') }}
          </router-link>
        </template>
      </PageHeader>
    </div>

    <div v-if="currentSong" class="visualizer-content">
      <h1 class="print-only song-title">{{ currentSong.name }}</h1>
      <MusicSheetDisplay
        ref="sheetDisplayRef"
        :xml-content="currentSong.xmlContent"
        @rendered="handleSheetRendered"
      />
      <ColoredPlayalong :xml-content="currentSong.xmlContent" />
    </div>

    <div v-else class="loading screen-only">
      {{ t('common.loading') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useResponsive } from '../composables/useResponsive';
import { SongService } from '../services/songService';
import { PrintService } from '../services/printService';
import PageHeader from '../components/layout/PageHeader.vue';
import MusicSheetDisplay from '../components/sheet/MusicSheetDisplay.vue';
import ColoredPlayalong from '../components/playalong/ColoredPlayalong.vue';
import type { Song } from '../types/song';

const route = useRoute();
const { t } = useI18n();
const { isMobile } = useResponsive();
const currentSong = ref<Song | null>(null);
const sheetDisplayRef = ref<InstanceType<typeof MusicSheetDisplay> | null>(
  null,
);
const songId = route.params.songId as string;
const printService = new PrintService();
const isSheetRendered = ref(false);

const handleSheetRendered = () => {
  isSheetRendered.value = true;
};

const handlePrintScore = async () => {
  if (!sheetDisplayRef.value?.isInitialized || !isSheetRendered.value) {
    console.warn('Sheet music not ready for printing');
    return;
  }

  await printService.print(async () => {
    try {
      await sheetDisplayRef.value?.renderScore();
    } catch (err) {
      console.error('Error re-rendering for print:', err);
    }
  });
};

onMounted(async () => {
  if (songId) {
    currentSong.value = await SongService.getSongById(songId);
  }
});
</script>

<style scoped>
.visualizer-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 100%;
  overflow-x: hidden;
}

.loading {
  text-align: center;
  padding: var(--spacing-xl);
  color: #666;
}

.print-only {
  display: none;
}

.song-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: black;
}

@media print {
  .screen-only {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .visualizer-content {
    gap: 2rem;
  }
}
</style>
