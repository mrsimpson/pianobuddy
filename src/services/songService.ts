import type {Song} from '../types/song';
import {getDatabase} from './database';
import {v4 as uuidv4} from 'uuid';

export class SongService {
  static async getAllSongs(): Promise<Song[]> {
    const db = await getDatabase();
    const songs = await db.songs.find().exec();
    return songs.map((doc) => doc.toJSON());
  }

  static async getSongById(id: string): Promise<Song | null> {
    const db = await getDatabase();
    const song = await db.songs.findOne(id).exec();
    return song ? song.toJSON() : null;
  }

  static async saveSong(
    song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Song> {
    const db = await getDatabase();
    const now = Date.now();

    const newSong: Song = {
      id: uuidv4(),
      ...song,
      createdAt: now,
      updatedAt: now,
    };

    await db.songs.insert(newSong);
    return newSong;
  }

  static async updateSong(id: string, updates: Partial<Song>): Promise<void> {
    const db = await getDatabase();
    await db.songs.atomicUpdate(id, (oldData: Song) => {
      return {
        ...oldData,
        ...updates,
        updatedAt: Date.now(),
      };
    });
  }

  static async deleteSong(id: string): Promise<void> {
    const db = await getDatabase();
    await db.songs.findOne(id).remove();
  }
}
