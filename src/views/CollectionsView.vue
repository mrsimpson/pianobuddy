<template>
  <div class="collections-view">
    <PageHeader :title="t('collections.title')">
    </PageHeader>

    <div v-if="loading" class="loading">
      {{ t('collections.loading') }}
    </div>

    <div v-else-if="error" class="error">
      {{ t('collections.error') }}
    </div>

    <div v-else class="collections-grid">
      <CollectionCard
        v-for="collection in collections"
        :key="collection.metadata.id"
        :collection="collection"
        :imported-song-ids="importedSongIds"
        @import="importSong"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { CollectionService } from '../services/collectionService';
import { SongService } from '../services/songService';
import PageHeader from '../components/layout/PageHeader.vue';
import CollectionCard from '../components/collections/CollectionCard.vue';
import type { MusicCollection, CollectionSong } from '../types/collection';

const { t } = useI18n();
const collections = ref<MusicCollection[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const importedSongIds = ref(new Set<string>());

const loadImportedSongs = async () => {
  try {
    const songs = await SongService.getAllSongs();
    importedSongIds.value = new Set(songs.map(song => song.id));
  } catch (error) {
    console.error('Error loading imported songs:', error);
  }
};

const loadCollections = async () => {
  try {
    const collectionIds = await CollectionService.getCollections();
    const loadedCollections = await Promise.all(
      collectionIds.map(id => CollectionService.getCollection(id))
    );
    collections.value = loadedCollections;
    await loadImportedSongs();
  } catch (err) {
    error.value = 'Failed to load collections. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const importSong = async (collectionId: string, song: CollectionSong) => {
  try {
    const xmlContent = await CollectionService.loadCollectionSong(collectionId, song.id);
    await SongService.saveSong({
      name: song.name,
      xmlContent
    });
    importedSongIds.value.add(song.id);
  } catch (error) {
    console.error('Error importing song:', error);
    alert('Failed to import song. Please try again.');
  }
};

onMounted(loadCollections);
</script>

<style scoped>
.collections-view {
  padding: var(--spacing-lg);
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.loading,
.error {
  text-align: center;
  padding: var(--spacing-xl);
  color: #666;
}

.error {
  color: var(--danger);
  background: #fee;
  border-radius: var(--radius-md);
}

@media (max-width: 600px) {
  .collections-grid {
    grid-template-columns: 1fr;
  }
}
</style>
