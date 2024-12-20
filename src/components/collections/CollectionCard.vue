<template>
  <div class="collection-card">
    <div class="card-header">
      <h2>{{ collection.metadata.name }}</h2>
      <p class="description">{{ collection.metadata.description }}</p>
    </div>

    <div class="song-list">
      <div
        v-for="song in collection.songs"
        :key="song.id"
        class="song-item"
        :class="{ imported: isImported(song.id) }"
      >
        <div class="song-info">
          <span class="song-name">{{ song.name }}</span>
          <div v-if="song.composer || song.arranger" class="song-details">
            <span v-if="song.composer" class="composer">{{
              song.composer
            }}</span>
            <span v-if="song.arranger" class="arranger"
              >arr. {{ song.arranger }}</span
            >
          </div>
        </div>
        <button
          class="btn btn-primary btn-sm"
          :disabled="isImported(song.id)"
          @click="$emit('import', collection.metadata.id, song)"
        >
          {{
            isImported(song.id)
              ? t('collections.added')
              : t('collections.addToLibrary')
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { CollectionSong, MusicCollection } from '../../types/collection';

const { t } = useI18n();

const props = defineProps<{
  collection: MusicCollection;
  importedSongIds: Set<string>;
}>();

defineEmits<{
  (e: 'import', collectionId: string, song: CollectionSong): void;
}>();

const isImported = (songId: string) => props.importedSongIds.has(songId);
</script>

<style scoped>
.collection-card {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: var(--spacing-md);
}

h2 {
  margin: 0;
  color: var(--text);
}

.description {
  color: #666;
  margin-top: var(--spacing-sm);
  font-size: 0.9rem;
}

.song-list {
  margin-top: var(--spacing-lg);
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  background: var(--light);
  margin-bottom: var(--spacing-sm);
  transition: background var(--transition-normal);
}

.song-item:hover {
  background: #f0f0f0;
}

.song-item.imported {
  background: #f0f9f4;
}

.song-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.song-name {
  font-weight: 500;
}

.song-details {
  font-size: 0.8rem;
  color: #666;
  display: flex;
  gap: var(--spacing-sm);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.9rem;
  min-width: 120px;
}

.btn:disabled {
  background: #90cba6;
  cursor: default;
}

@media (max-width: 600px) {
  .song-item {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }

  .btn-sm {
    width: 100%;
  }
}
</style>
