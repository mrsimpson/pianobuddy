<template>
  <div class="song-visualizer">
    <div class="screen-only">
      <PageHeader :title="currentSong?.name || t('common.loading')">
        <template #actions>
          <div class="display-mode-group">
            <button
              v-for="mode in displayModes"
              :key="mode"
              :class="{
                'btn-primary': displayMode === mode,
                'btn-secondary': displayMode !== mode,
              }"
              class="btn"
              @click="setDisplayMode(mode)"
            >
              {{ t(`displayMode.${mode}`) }}
            </button>
          </div>
          <button :disabled="!isSheetRendered" class="btn btn-primary" @click="handlePrintScore">
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
        v-if="showSheet"
        ref="sheetDisplayRef"
        :xml-content="currentSong.xmlContent"
        @rendered="handleSheetRendered"
      />

      <ColoredPlayalong v-if="showPlayalong" :xml-content="currentSong.xmlContent" />
    </div>

    <div v-else class="loading screen-only">
      {{ t('common.loading') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useResponsive } from '../composables/useResponsive'
import { SongService } from '../services/songService'
import { PrintService } from '../services/printService'
import { DisplayMode } from '../types/displayMode'
import PageHeader from '../components/layout/PageHeader.vue'
import MusicSheetDisplay from '../components/sheet/MusicSheetDisplay.vue'
import ColoredPlayalong from '../components/playalong/ColoredPlayalong.vue'
import type { Song } from '../types/song'
import { useDisplayMode } from '../composables/useDisplayMode'

const route = useRoute()
const { t } = useI18n()
const { isMobile } = useResponsive()
const currentSong = ref<Song | null>(null)
const sheetDisplayRef = ref<InstanceType<typeof MusicSheetDisplay> | null>(null)
const songId = route.params.songId as string
const printService = new PrintService()
const isSheetRendered = ref(false)
const { displayMode, setDisplayMode } = useDisplayMode()

const displayModes = [DisplayMode.ALL, DisplayMode.SHEET, DisplayMode.PLAYALONG]

const showSheet = computed(
  () => displayMode.value === DisplayMode.ALL || displayMode.value === DisplayMode.SHEET,
)

const showPlayalong = computed(
  () => displayMode.value === DisplayMode.ALL || displayMode.value === DisplayMode.PLAYALONG,
)

const handleSheetRendered = () => {
  isSheetRendered.value = true
}

const handlePrintScore = async () => {
  if (showSheet.value && !(sheetDisplayRef.value?.isInitialized && isSheetRendered.value)) {
    console.warn('Sheet music not ready for printing')
    return
  }

  await printService.print(async () => {
    try {
      await sheetDisplayRef.value?.renderScore()
    } catch (err) {
      console.error('Error re-rendering for print:', err)
    }
  })
}

onMounted(async () => {
  if (songId) {
    currentSong.value = await SongService.getSongById(songId)
  }
})
</script>

<style scoped>
.song-visualizer {
  padding: var(--spacing-lg);
}

.display-mode-group {
  display: flex;
  gap: var(--spacing-sm);
  margin-right: var(--spacing-md);
}

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
