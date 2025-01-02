import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SongService } from '../songService'
import { getDatabase } from '../database'
import { v4 as uuidv4 } from 'uuid'

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-uuid'),
}))

vi.mock('../database', () => ({
  getDatabase: vi.fn(),
}))

describe('SongService', () => {
  const mockDb = {
    songs: {
      toArray: vi.fn(),
      get: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
      ; (getDatabase as ReturnType<typeof vi.fn>).mockReturnValue(mockDb)
    // Mock Date.now() to return a consistent timestamp
    vi.spyOn(Date, 'now').mockReturnValue(1000)
  })

  describe('getSongById', () => {
    it('should retrieve song by ID', async () => {
      const mockSong = { id: 'test-id', name: 'Test Song' }
      mockDb.songs.get.mockResolvedValue(mockSong)

      const song = await SongService.getSongById('test-id')

      expect(mockDb.songs.get).toHaveBeenCalledWith('test-id')
      expect(song).toEqual(mockSong)
    })

    it('should return null for non-existent song', async () => {
      mockDb.songs.get.mockResolvedValue(null)

      const song = await SongService.getSongById('non-existent')
      expect(song).toBeNull()
    })
  })

  describe('saveSong', () => {
    it('should save a new song', async () => {
      const newSong = {
        name: 'New Song',
        xmlContent: '<xml>new song</xml>',
      }

      const expectedSong = {
        id: 'test-uuid',
        name: 'New Song',
        xmlContent: '<?xml version="1.0" encoding="UTF-8"?>\n<xml>new song</xml>',
        createdAt: 1000,
        updatedAt: 1000,
      }

      mockDb.songs.add.mockResolvedValue(undefined)

      const savedSong = await SongService.saveSong(newSong)

      expect(mockDb.songs.add).toHaveBeenCalledWith(expectedSong)
      expect(savedSong).toEqual(expectedSong)
      expect(uuidv4).toHaveBeenCalled()
    })
  })

  describe('updateSong', () => {
    it('should update an existing song', async () => {
      const updates = { name: 'Updated Song Name' }

      await SongService.updateSong('test-id', updates)

      expect(mockDb.songs.update).toHaveBeenCalledWith('test-id', {
        ...updates,
        updatedAt: 1000,
      })
    })
  })

  describe('deleteSong', () => {
    it('should delete a song', async () => {
      await SongService.deleteSong('test-id')
      expect(mockDb.songs.delete).toHaveBeenCalledWith('test-id')
    })
  })
})
