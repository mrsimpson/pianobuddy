import { ValidationResult } from '../../types/musicxml';

export class MusicXmlValidator {
  static validateStructure(doc: Document): ValidationResult {
    if (!doc.querySelector('score-partwise')) {
      return { isValid: false, error: 'Not a valid MusicXML file' };
    }
    return { isValid: true };
  }

  static validateVoices(part: Element): ValidationResult {
    const voices = part.querySelectorAll('voice');
    const uniqueVoices = new Set(Array.from(voices).map(v => v.textContent));
/*    
    if (uniqueVoices.size > 1) {
      return { 
        isValid: false, 
        error: 'Multiple voices in a part are not supported. Please use single-voice melodies only.' 
      };
    }
    */
    return { isValid: true };
  }
}