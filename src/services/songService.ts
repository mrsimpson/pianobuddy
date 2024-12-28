import type { Song } from '../types/song'
import { getDatabase } from './database'
import { v4 as uuidv4 } from 'uuid'
import { MusicXmlService } from './musicXmlService'

export class SongService {
  private static musicXmlService = new MusicXmlService()

  static async getAllSongs(): Promise<Song[]> {
    const db = await getDatabase()
    const songs = await db.songs.find().exec()
    return songs.map((doc: unknown) => doc.toJSON())
  }

  static async getSongById(id: string): Promise<Song | null> {
    const db = await getDatabase()
    const song = await db.songs.findOne(id).exec()
    return song ? song.toJSON() : null
  }

  static async saveSong(
    song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'> & { file?: File },
  ): Promise<Song> {
    const db = await getDatabase()
    const now = Date.now()

    let xmlContent: string
    if (song.file) {
      const fileExtension = song.file.name.split('.').pop()?.toLowerCase()

      if (fileExtension === 'mxl') {
        xmlContent = await this.musicXmlService.unzipMxlFile(song.file)
      } else {
        xmlContent = await song.file.text()
      }
    } else {
      xmlContent = song.xmlContent
    }

    const newSong: Song = {
      id: uuidv4(),
      name: song.name,
      xmlContent: this.musicXmlService.formatXml(xmlContent),
      createdAt: now,
      updatedAt: now,
    }

    await db.songs.insert(newSong)
    return newSong
  }

  static async updateSong(id: string, updates: Partial<Song>): Promise<void> {
    const db = await getDatabase()
    await db.songs.atomicUpdate(id, (oldData: Song) => {
      return {
        ...oldData,
        ...updates,
        updatedAt: Date.now(),
      }
    })
  }

  static async deleteSong(id: string): Promise<void> {
    const db = await getDatabase()
    await db.songs.findOne(id).remove()
  }
}
