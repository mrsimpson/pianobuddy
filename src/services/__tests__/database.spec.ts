import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDatabase } from '../database';
import { createRxDatabase } from 'rxdb';

// Mock RxDB dependencies
vi.mock('rxdb', () => ({
  createRxDatabase: vi.fn(),
  addRxPlugin: vi.fn(),
}));

describe('Database Service', () => {
  beforeEach(() => {
    // Clear any previous mocks
    vi.clearAllMocks();
  });

  it('should create database with correct configuration', async () => {
    // Mock database object
    const mockDb = {
      addCollections: vi.fn().mockResolvedValue({}),
      songs: {},
    };

    // Configure mock createRxDatabase
    vi.mocked(createRxDatabase).mockResolvedValue(mockDb);

    // Initialize database
    await getDatabase();

    // Verify database creation
    expect(createRxDatabase).toHaveBeenCalledWith({
      name: 'pianolearningdb',
      storage: expect.anything(),
      ignoreDuplicate: true,
    });

    // Verify collections added
    expect(mockDb.addCollections).toHaveBeenCalledWith({
      songs: {
        schema: expect.any(Object),
      },
    });
  });

  it.skip('should return same database instance on subsequent calls', async () => {
    // Mock database object
    const mockDb = {
      addCollections: vi.fn().mockResolvedValue({}),
      songs: {},
    };

    // Configure mock createRxDatabase
    vi.mocked(createRxDatabase).mockResolvedValue(mockDb);

    // Get database twice
    const db1 = await getDatabase();
    const db2 = await getDatabase();

    // Verify same instance returned
    expect(createRxDatabase).toHaveBeenCalledTimes(1);
    expect(db1).toBe(db2);
  });

  it.skip('should handle database creation errors', async () => {
    // Simulate database creation error
    vi.mocked(createRxDatabase).mockRejectedValue(
      new Error('Database creation failed'),
    );

    // Attempt to get database
    await expect(getDatabase()).rejects.toThrow('Database creation failed');
  });
});
