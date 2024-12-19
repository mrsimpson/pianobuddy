import { parseXml } from '../utils/xmlParser';
import type { CollectionMetadata, CollectionSong, MusicCollection } from '../types/collection';

export class CollectionLoader {
  private static async loadMetadata(collectionId: string): Promise<CollectionMetadata> {
    try {
      const response = await fetch(`/collections/${collectionId}/metadata.json`);
      if (!response.ok) {
        throw new Error(`Failed to load metadata for collection: ${collectionId}`);
      }
      const metadata = await response.json();
      return {
        id: collectionId,
        name: metadata.name,
        description: metadata.description,
        order: metadata.order
      };
    } catch (error) {
      console.error(`Error loading collection metadata: ${collectionId}`, error);
      throw error;
    }
  }

  private static async loadMusicXmlMetadata(xmlContent: string): Promise<Partial<CollectionSong>> {
    try {
      const doc = parseXml(xmlContent);
      
      const work = doc.querySelector('work-title')?.textContent || '';
      const composer = doc.querySelector('creator[type="composer"]')?.textContent;
      const arranger = doc.querySelector('creator[type="arranger"]')?.textContent;
      const copyright = doc.querySelector('rights')?.textContent;

      return {
        name: work || '',
        composer,
        arranger,
        copyright
      };
    } catch (error) {
      console.error('Error parsing MusicXML metadata:', error);
      return {};
    }
  }

  static async loadCollection(collectionId: string): Promise<MusicCollection> {
    try {
      // Load collection metadata
      const metadata = await this.loadMetadata(collectionId);
      
      // Load collection index (list of files)
      const indexResponse = await fetch(`/collections/${collectionId}/index.json`);
      if (!indexResponse.ok) {
        throw new Error(`Failed to load collection index: ${collectionId}`);
      }
      const files = await indexResponse.json();
      
      // Load each song's metadata
      const songs: CollectionSong[] = [];
      for (const filename of files) {
        try {
          const response = await fetch(`/collections/${collectionId}/${filename}`);
          if (!response.ok) continue;

          const xmlContent = await response.text();
          const songMetadata = await this.loadMusicXmlMetadata(xmlContent);
          
          songs.push({
            id: filename.replace(/\.(musicxml|xml)$/, ''),
            filename,
            name: songMetadata.name || filename,
            composer: songMetadata.composer,
            arranger: songMetadata.arranger,
            copyright: songMetadata.copyright
          });
        } catch (error) {
          console.error(`Error loading song: ${filename}`, error);
        }
      }

      return {
        metadata,
        songs: songs.sort((a, b) => a.name.localeCompare(b.name))
      };
    } catch (error) {
      console.error(`Error loading collection: ${collectionId}`, error);
      throw error;
    }
  }

  static async loadAvailableCollections(): Promise<string[]> {
    try {
      const response = await fetch('/collections/index.json');
      if (!response.ok) {
        throw new Error('Failed to load collections index');
      }
      const collections = await response.json();
      return collections.map((col: { id: string }) => col.id);
    } catch (error) {
      console.error('Error loading collections:', error);
      throw error;
    }
  }
}
