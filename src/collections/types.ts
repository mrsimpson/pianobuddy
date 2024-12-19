export interface MusicCollection {
  id: string;
  name: string;
  description: string;
  songs: CollectionSong[];
}

export interface CollectionSong {
  id: string;
  name: string;
  filename: string;
}
