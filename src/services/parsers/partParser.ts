import { type MusicPart } from '../../types/musicxml';
import { NoteParser } from './noteParser';
import { DurationParser } from './durationParser';

export class PartParser {
  static parseAllParts(doc: Document): MusicPart[] {
    const parts: MusicPart[] = [];
    const partElements = doc.querySelectorAll('part');

    partElements.forEach((partEl, index) => {
      // Parse divisions from the first measure's attributes
      const firstMeasure = partEl.querySelector('measure');
      if (firstMeasure) {
        DurationParser.parseAttributes(firstMeasure);
      }

      const partId = partEl.getAttribute('id') || `P${index + 1}`;
      const scorePartEl = doc.querySelector(`score-part#${partId}`);
      const partName =
        scorePartEl?.querySelector('part-name')?.textContent ||
        `Part ${index + 1}`;

      // Parse staffs within the part
      const staffMap = new Map<number, Element[]>();

      partEl.querySelectorAll('measure').forEach((measure) => {
        measure.querySelectorAll('note').forEach((note) => {
          const staffNumber = parseInt(
            note.querySelector('staff')?.textContent || '1',
          );
          if (!staffMap.has(staffNumber)) {
            staffMap.set(staffNumber, []);
          }
          staffMap.get(staffNumber)?.push(note);
        });
      });

      // Create a part for each staff
      staffMap.forEach((staffNotes, staffNumber) => {
        const staffId = `${partId}_staff${staffNumber}`;
        const staffName =
          staffMap.size > 1 ? `${partName} - Staff ${staffNumber}` : partName;

        parts.push({
          id: staffId,
          name: staffName,
          notes: NoteParser.parseNoteElements(staffNotes),
        });
      });
    });

    return parts;
  }
}
