import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getDatabase } from '../database'

// Mock Dexie
vi.mock('dexie', () => {
  return {
    default: class Dexie {
      version() {
        return {
          stores: vi.fn().mockReturnThis(),
        }
      }
      constructor(name: string) {
        this.name = name
      }
      name: string
    },
  }
})

describe('Database Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create database with correct name', () => {
    const db = getDatabase()
    expect(db.name).toBe('pianobuddydb')
  })

  it('should return same database instance on subsequent calls', () => {
    const db1 = getDatabase()
    const db2 = getDatabase()
    expect(db1).toBe(db2)
  })
})
