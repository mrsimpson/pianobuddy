import { CollectionLoader } from './collectionLoader';
import type { MusicCollection } from '../types/collection';
import { MusicXmlService } from './musicXmlService';

export class CollectionService {
  private static collections = new Map<string, MusicCollection>();
  private static musicXmlService = new MusicXmlService();

  static async loadCollectionSong(
    collectionId: string,
    songId: string,
  ): Promise<string> {
    try {
      let collection = this.collections.get(collectionId);
      if (!collection) {
        collection = await CollectionLoader.loadCollection(collectionId);
        this.collections.set(collectionId, collection);
      }

      const song = collection.songs.find((s) => s.id === songId);
      if (!song) {
        throw new Error(
          `Song ${songId} not found in collection ${collectionId}`,
        );
      }

      const response = await fetch(
        `/collections/${collectionId}/${song.filename}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to load song file: ${song.filename}`);
      }

      const fileBlob = await response.blob();
      const fileExtension = song.filename.split('.').pop()?.toLowerCase();

      // Handle MXL files
      if (fileExtension === 'mxl') {
        return await this.musicXmlService.unzipMxlFile(
          new File([fileBlob], song.filename),
        );
      }

      return await fileBlob.text();
    } catch (error) {
      console.error('Error loading collection song:', error);
      throw error;
    }
  }

  static async getCollections(): Promise<string[]> {
    return await CollectionLoader.loadAvailableCollections();
  }

  static async getCollection(id: string): Promise<MusicCollection> {
    let collection = this.collections.get(id);
    if (!collection) {
      collection = await CollectionLoader.loadCollection(id);
      this.collections.set(id, collection);
    }
    return collection;
  }
}
