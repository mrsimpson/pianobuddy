import { ref } from 'vue';
import type { MusicPart } from '../types/musicxml';

export function usePartsExtractor() {
  const parts = ref<MusicPart[]>([]);

  return {
    parts,
  };
}
