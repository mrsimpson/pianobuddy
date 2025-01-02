import Dexie, { type Table } from 'dexie'
import type { Song } from '../types/song'
import type { Setting } from '../types/settings'

export class PianoBuddyDB extends Dexie {
  songs!: Table<Song>
  settings!: Table<Setting>

  constructor() {
    super('pianobuddydb')

    this.version(1).stores({
      songs: '&id, name',
      settings: '&key, value',
    })
  }
}

const db = new PianoBuddyDB()

export const getDatabase = () => db
