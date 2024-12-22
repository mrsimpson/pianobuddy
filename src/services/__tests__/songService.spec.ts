import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SongService } from '../songService';
import { getDatabase } from '../database'; // Mock database and its methods

// Mock database and its methods
vi.mock('../database', () => ({
  getDatabase: vi.fn(),
}));

describe('SongService', () => {
  const mockSong = {
    id: 'test-id',
    name: 'Test Song',
    xmlContent: '<xml>test</xml>',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  let mockDb: any;
  let mockSongCollection: any;
  let removeMock: vi.MockInstance<any, any>;

  beforeEach(() => {
    // Reset mocks

    removeMock = vi.fn().mockResolvedValue(null);

    mockSongCollection = {
      find: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValue([
        {
          ...mockSong,
          toJSON: () => mockSong,
        },
      ]),
      findOne: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          ...mockSong,
          toJSON: () => mockSong,
        }),
        remove: removeMock,
      }),
      insert: vi.fn().mockResolvedValue({
        ...mockSong,
        toJSON: () => mockSong,
      }),
      atomicUpdate: vi.fn().mockResolvedValue({
        ...mockSong,
        toJSON: () => mockSong,
      }),
      remove: removeMock,
    };

    mockDb = {
      songs: mockSongCollection,
    };

    vi.mocked(getDatabase).mockResolvedValue(mockDb);
  });

  describe('getAllSongs', () => {
    it('should retrieve all songs', async () => {
      const songs = await SongService.getAllSongs();

      expect(mockSongCollection.find).toHaveBeenCalled();
      expect(songs).toEqual([mockSong]);
    });

    it('should handle empty song list', async () => {
      mockSongCollection.exec.mockResolvedValue([]);

      const songs = await SongService.getAllSongs();
      expect(songs).toEqual([]);
    });
  });

  describe('getSongById', () => {
    it('should retrieve song by ID', async () => {
      mockSongCollection.exec.mockResolvedValue(mockSong);

      const song = await SongService.getSongById('test-id');

      expect(mockSongCollection.findOne).toHaveBeenCalledWith('test-id');
      expect(song).toEqual(mockSong);
    });

    it('should return null for non-existent song', async () => {
      mockSongCollection.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      const song = await SongService.getSongById('non-existent');
      expect(song).toBeNull();
    });
  });

  describe('saveSong', () => {
    it('should save a new song', async () => {
      const newSong = {
        name: 'New Song',
        xmlContent: '<xml>new song</xml>',
      };

      const savedSong = await SongService.saveSong(newSong);

      expect(mockSongCollection.insert).toHaveBeenCalled();
      expect(savedSong.name).toBe(newSong.name);
      expect(savedSong.id).toBeDefined();
      expect(savedSong.createdAt).toBeDefined();
      expect(savedSong.updatedAt).toBeDefined();
    });
  });

  describe('updateSong', () => {
    it('should update an existing song', async () => {
      const updates = { name: 'Updated Song Name' };

      await SongService.updateSong('test-id', updates);

      expect(mockSongCollection.atomicUpdate).toHaveBeenCalledWith(
        'test-id',
        expect.any(Function),
      );
    });
  });

  describe('deleteSong', () => {
    it('should delete a song', async () => {
      await SongService.deleteSong('test-id');

      expect(mockSongCollection.findOne).toHaveBeenCalledWith('test-id');
      expect(removeMock).toHaveBeenCalled();
    });
  });
});
