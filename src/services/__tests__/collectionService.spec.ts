import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CollectionService } from '../collectionService';
import { CollectionLoader } from '../collectionLoader';

describe('CollectionService', () => {
  const mockCollection = {
    metadata: {
      id: 'christmas',
      name: 'Christmas Songs',
      description: 'Holiday music collection',
    },
    songs: [
      {
        id: 'song1',
        name: 'Test Song',
        filename: 'test-song.musicxml',
      },
    ],
  };

  const mockXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <score-partwise>
      <work>
        <work-title>Test Song</work-title>
      </work>
    </score-partwise>`;

  beforeEach(() => {
    // Clear any cached collections
    CollectionService['collections'].clear();
  });

  describe('getCollections', () => {
    it('should fetch available collections', async () => {
      const mockCollectionIds = ['christmas', 'folk'];
      vi.spyOn(CollectionLoader, 'loadAvailableCollections').mockResolvedValue(
        mockCollectionIds,
      );

      const collections = await CollectionService.getCollections();
      expect(collections).toEqual(mockCollectionIds);
    });
  });

  describe('getCollection', () => {
    it('should load and cache collection', async () => {
      vi.spyOn(CollectionLoader, 'loadCollection').mockResolvedValue(
        mockCollection,
      );

      const collection = await CollectionService.getCollection('christmas');

      expect(collection).toEqual(mockCollection);

      // Verify caching
      const cachedCollection =
        CollectionService['collections'].get('christmas');
      expect(cachedCollection).toEqual(mockCollection);
    });

    it('should return cached collection on subsequent calls', async () => {
      const loadSpy = vi
        .spyOn(CollectionLoader, 'loadCollection')
        .mockResolvedValue(mockCollection);

      // First call loads collection
      await CollectionService.getCollection('christmas');

      // Second call should use cached version
      await CollectionService.getCollection('christmas');

      // Loader should be called only once
      expect(loadSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadCollectionSong', () => {
    it('should load song from collection', async () => {
      const mockBlob = new Blob([mockXmlContent], { type: 'text/xml' });
      // Explicitly add text method to the blob
      mockBlob.text = () => Promise.resolve(mockXmlContent);

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });
      global.fetch = mockFetch;

      // Preload collection in cache
      vi.spyOn(CollectionLoader, 'loadCollection').mockResolvedValue(
        mockCollection,
      );
      await CollectionService.getCollection('christmas');

      const xmlContent = await CollectionService.loadCollectionSong(
        'christmas',
        'song1',
      );

      expect(xmlContent).toBe(mockXmlContent);
      expect(mockFetch).toHaveBeenCalledWith(
        '/collections/christmas/test-song.musicxml',
      );
    });

    it('should throw error for non-existent song', async () => {
      // Preload collection in cache
      vi.spyOn(CollectionLoader, 'loadCollection').mockResolvedValue(
        mockCollection,
      );
      await CollectionService.getCollection('christmas');

      await expect(
        CollectionService.loadCollectionSong('christmas', 'non-existent'),
      ).rejects.toThrow('Song non-existent not found');
    });
  });
});
