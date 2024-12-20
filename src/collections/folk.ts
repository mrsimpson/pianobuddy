import type { MusicCollection } from './types';

export const folkCollection: MusicCollection = {
  id: 'folk',
  name: 'Folk Songs',
  description: 'Traditional folk songs from around the world',
  songs: [
    {
      id: 'greensleeves',
      name: 'Greensleeves',
      filename: 'greensleeves.musicxml',
    },
    // Add more songs here
  ],
};
