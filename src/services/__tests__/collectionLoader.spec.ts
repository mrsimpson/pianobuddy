import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CollectionLoader } from '../collectionLoader'

describe('CollectionLoader', () => {
  const mockFetch = vi.fn()
  global.fetch = mockFetch

  beforeEach(() => {
    mockFetch.mockClear()
  })

  const mockCollectionIndex = [{ id: 'christmas', order: 1 }]

  const mockCollectionMetadata = {
    id: 'christmas',
    name: 'Christmas Songs',
    description: 'Holiday music collection',
  }

  const mockXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <score-partwise>
      <work>
        <work-title>Test Song</work-title>
      </work>
      <identification>
        <creator type="composer">Test Composer</creator>
      </identification>
    </score-partwise>`

  describe('loadAvailableCollections', () => {
    it('should fetch and return collection IDs', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCollectionIndex),
      })

      const collections = await CollectionLoader.loadAvailableCollections()
      expect(collections).toEqual(['christmas'])
      expect(mockFetch).toHaveBeenCalledWith('/collections/index.json')
    })

    it('should throw error if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      await expect(CollectionLoader.loadAvailableCollections()).rejects.toThrow(
        'Failed to load collections index',
      )
    })
  })

  describe('loadMetadata', () => {
    it('should load collection metadata', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCollectionMetadata),
      })

      const metadata = await CollectionLoader['loadMetadata']('christmas')
      expect(metadata).toEqual({
        id: 'christmas',
        name: 'Christmas Songs',
        description: 'Holiday music collection',
        order: undefined,
      })
    })

    it('should throw error for invalid metadata fetch', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      await expect(CollectionLoader['loadMetadata']('christmas')).rejects.toThrow(
        'Failed to load metadata',
      )
    })
  })

  describe('loadMusicXmlMetadata', () => {
    it('should extract metadata from MusicXML', async () => {
      const metadata = await CollectionLoader['loadMusicXmlMetadata'](mockXmlContent)

      expect(metadata).toEqual({
        name: 'Test Song',
        composer: 'Test Composer',
        arranger: undefined,
        copyright: undefined,
      })
    })

    it('should handle XML without complete metadata', async () => {
      const incompleteXml = `<?xml version="1.0" encoding="UTF-8"?>
        <score-partwise></score-partwise>`

      const metadata = await CollectionLoader['loadMusicXmlMetadata'](incompleteXml)

      expect(metadata).toEqual({
        name: '',
        composer: undefined,
        arranger: undefined,
        copyright: undefined,
      })
    })
  })

  describe('loadCollection', () => {
    it('should load complete collection', async () => {
      // Mock metadata fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCollectionMetadata),
      })

      // Mock index fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(['song1.musicxml']),
      })

      // Mock song XML fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockXmlContent),
      })

      const collection = await CollectionLoader.loadCollection('christmas')

      expect(collection.metadata.id).toBe('christmas')
      expect(collection.songs.length).toBe(1)
      expect(collection.songs[0].name).toBe('Test Song')
    })

    it('should handle partial collection loading', async () => {
      // Mock metadata fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCollectionMetadata),
      })

      // Mock index fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(['song1.musicxml', 'song2.musicxml']),
      })

      // First song loads successfully
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockXmlContent),
      })

      // Second song fails to load
      mockFetch.mockResolvedValueOnce({
        ok: false,
      })

      const collection = await CollectionLoader.loadCollection('christmas')

      expect(collection.songs.length).toBe(1)
    })
  })
})
