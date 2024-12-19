import type { MusicCollection } from './types';

export const classicalCollection: MusicCollection = {
  id: 'classical',
  name: 'Classical Favorites',
  description: 'A collection of beloved classical pieces for piano',
  songs: [
    {
      id: 'fur-elise',
      name: 'Für Elise',
      filename: 'fur-elise.musicxml'
    }
    // Add more songs here
  ]
};
