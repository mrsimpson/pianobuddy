<template>
  <div class="song-visualizer">
    <PageHeader :title="currentSong?.name || 'Song Viewer'">
      <template #actions>
        <router-link 
          to="/library" 
          class="btn btn-secondary"
        >
          Back to Library
        </router-link>
      </template>
    </PageHeader>

    <div class="visualizer-content" v-if="currentSong">
      <MusicSheetDisplay :xml-content="currentSong.xmlContent" />
      <ColoredPlayalong :xml-content="currentSong.xmlContent" />
    </div>

    <div v-else class="loading">
      Loading song...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SongService } from '../services/songService';
import PageHeader from '../components/layout/PageHeader.vue';
import MusicSheetDisplay from '../components/sheet/MusicSheetDisplay.vue';
import ColoredPlayalong from '../components/playalong/ColoredPlayalong.vue';
import type { Song } from '../types/song';

const route = useRoute();
const currentSong = ref<Song | null>(null);
const songId = route.params.songId as string;

onMounted(async () => {
  if (songId) {
    currentSong.value = await SongService.getSongById(songId);
  }
});
</script>

<style scoped>
.song-visualizer {
  padding: var(--spacing-lg);
}

.visualizer-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.loading {
  text-align: center;
  padding: var(--spacing-xl);
  color: #666;
}
</style>