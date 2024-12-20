import { MusicPart } from '../../types/musicxml';
import { NoteParser } from './noteParser';
import { MusicXmlValidator } from '../validators/musicXmlValidator';

export class PartParser {
  static parseFirstPart(doc: Document): MusicPart | null {
    const firstPart = doc.querySelector('part');
    if (!firstPart) return null;

    const partId = firstPart.getAttribute('id') || 'P1';
    const validationResult = MusicXmlValidator.validateVoices(firstPart);

    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    return {
      id: partId,
      notes: NoteParser.parseNotes(firstPart),
    };
  }
}
