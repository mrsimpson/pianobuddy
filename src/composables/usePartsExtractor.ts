import { ref } from 'vue';
import { parseXml } from '../utils/xmlParser';
import type { MusicPart } from '../types/musicxml';
import { NoteParser } from '../services/parsers/noteParser';

export function usePartsExtractor() {
  const parts = ref<MusicPart[]>([]);

  const extractParts = (xmlContent: string): MusicPart[] => {
    try {
      const doc = parseXml(xmlContent);
      const partElements = doc.querySelectorAll('part');
      
      return Array.from(partElements).map((partEl, index) => {
        const id = partEl.getAttribute('id') || `P${index + 1}`;
        const name = doc.querySelector(`score-part#${id} part-name`)?.textContent || `Part ${index + 1}`;
        
        return {
          id,
          name,
          notes: NoteParser.parseNotes(partEl)
        };
      });
    } catch (error) {
      console.error('Error extracting parts:', error);
      return [];
    }
  };

  return {
    parts,
    extractParts
  };
}