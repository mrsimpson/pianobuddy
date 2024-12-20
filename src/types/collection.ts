export interface CollectionMetadata {
  id: string;
  name: string;
  description: string;
  order?: number;
}

export interface CollectionSong {
  id: string;
  name: string;
  composer?: string | null;
  arranger?: string | null;
  copyright?: string | null;
  filename: string;
}

export interface MusicCollection {
  metadata: CollectionMetadata;
  songs: CollectionSong[];
}
