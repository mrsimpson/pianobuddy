import { addRxPlugin, createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { type Song, songSchema } from '../types/song'
import type { Setting } from '../types/settings'
import { settingsSchema } from '../types/settings'

// Add dev-mode plugin in development
if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin)
}

let dbPromise: Promise<unknown> | null = null

export interface Collections {
  songs: RxCollection<Song>
  settings: RxCollection<Setting>
}

export const collections = {
  songs: {
    schema: songSchema,
  },
  settings: {
    schema: settingsSchema,
  },
}

const createDatabase = async () => {
  const db = await createRxDatabase({
    name: 'pianolearningdb',
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  })

  await db.addCollections({
    songs: {
      schema: songSchema,
    },
    settings: {
      schema: settingsSchema,
    },
  })

  return db
}

export const getDatabase = async () => {
  if (!dbPromise) {
    dbPromise = createDatabase()
  }
  return dbPromise
}
