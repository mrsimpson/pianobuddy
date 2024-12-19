<template>
  <div class="song-library">
    <PageHeader title="Song Library">
      <template #actions>
        <button class="btn btn-primary" @click="showImportDialog">
          Import Song
        </button>
      </template>
    </PageHeader>
    
    <div class="song-list" v-if="!loading">
      <div v-if="songs.length === 0" class="empty-state">
        <p>No songs available. Import a song to get started.</p>
      </div>
      
      <div v-else class="song-grid">
        <div 
          v-for="song in songs" 
          :key="song.id" 
          class="song-card"
          @click="navigateToSong(song.id)"
        >
          <h3>{{ song.name }}</h3>
          <p class="song-meta">
            Created: {{ formatDate(song.createdAt) }}
          </p>
          <div class="song-actions">
            <button 
              class="btn btn-danger"
              @click.stop="deleteSong(song.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      Loading songs...
    </div>

    <ImportDialog 
      :is-open="isImportDialogOpen"
      @close="isImportDialogOpen = false"
      @imported="handleImported"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SongService } from '../services/songService';
import { formatDate } from '../utils/dateFormatter';
import PageHeader from '../components/layout/PageHeader.vue';
import ImportDialog from '../components/library/ImportDialog.vue';
import type { Song } from '../types/song';

const router = useRouter();
const songs = ref<Song[]>([]);
const loading = ref(true);
const isImportDialogOpen = ref(false);

const loadSongs = async () => {
  try {
    songs.value = await SongService.getAllSongs();
  } catch (error) {
    console.error('Error loading songs:', error);
  } finally {
    loading.value = false;
  }
};

const navigateToSong = (songId: string) => {
  router.push(`/song/${songId}`);
};

const deleteSong = async (songId: string) => {
  if (!confirm('Are you sure you want to delete this song?')) return;
  
  try {
    await SongService.deleteSong(songId);
    await loadSongs();
  } catch (error) {
    console.error('Error deleting song:', error);
  }
};

const showImportDialog = () => {
  isImportDialogOpen.value = true;
};

const handleImported = async () => {
  isImportDialogOpen.value = false;
  await loadSongs();
};

onMounted(loadSongs);
</script>

<style scoped>
.song-library {
  padding: var(--spacing-lg);
}

.song-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.song-card {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.song-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.song-meta {
  color: #666;
  font-size: 0.9rem;
  margin: var(--spacing-sm) 0;
}

.song-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: #666;
}

.loading {
  text-align: center;
  padding: var(--spacing-xl);
  color: #666;
}

@media (max-width: 600px) {
  .song-grid {
    grid-template-columns: 1fr;
  }
}
</style>