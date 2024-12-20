import { MusicCollection } from './types';
import { classicalCollection } from './classical';
import { folkCollection } from './folk';

export const collections: MusicCollection[] = [
  classicalCollection,
  folkCollection,
];

export * from './types';
