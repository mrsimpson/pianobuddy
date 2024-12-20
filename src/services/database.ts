import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { songSchema } from '../types/song';

// Add dev-mode plugin in development
if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin);
}

let dbPromise: Promise<any> | null = null;

const createDatabase = async () => {
  const db = await createRxDatabase({
    name: 'pianolearningdb',
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  await db.addCollections({
    songs: {
      schema: songSchema,
    },
  });

  return db;
};

export const getDatabase = async () => {
  if (!dbPromise) {
    dbPromise = createDatabase();
  }
  return dbPromise;
};
