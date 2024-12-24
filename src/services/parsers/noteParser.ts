import { ParsedNote } from '../../types/musicxml';
import { DurationParser } from './durationParser';
import { getNoteColor } from '../../types/piano';

export class NoteParser {
  static parseNoteElements(notes: Element[]): ParsedNote[] {
    const parsedNotes: ParsedNote[] = [];

    notes.forEach((note) => {
      const parsedNote = this.parseNote(note);
      if (parsedNote) {
        parsedNotes.push(parsedNote);
      }
    });

    return parsedNotes;
  }

  static parseNote(noteElement: Element): ParsedNote | null {
    const isRest = noteElement.querySelector('rest') !== null;

    if (isRest) {
      const duration = DurationParser.parseDuration(noteElement);
      return {
        pitch: 'rest',
        duration,
        octave: 4,
        isRest: true,
      };
    }

    const pitchEl = noteElement.querySelector('pitch');
    if (!pitchEl) return null;

    const step = pitchEl.querySelector('step')?.textContent || '';
    const alter = parseInt(pitchEl.querySelector('alter')?.textContent || '0');
    const octave = parseInt(
      pitchEl.querySelector('octave')?.textContent || '4',
    );
    const duration = DurationParser.parseDuration(noteElement);
    const lyricEl = noteElement.querySelector('lyric');
    const lyric = lyricEl?.querySelector('text')?.textContent || '';

    // Construct pitch name with accidental
    let fullPitch = step;
    if (alter === 1) {
      fullPitch += '#';
    } else if (alter === -1) {
      fullPitch += 'b';
    } else if (alter === 2) {
      fullPitch += '##';
    } else if (alter === -2) {
      fullPitch += 'bb';
    }

    return {
      pitch: fullPitch,
      duration,
      octave,
      isRest: false,
      lyric,
      alter,
    };
  }

  static addNoteHeadColor(xmlContent: string): string {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

    const notes = xmlDoc.querySelectorAll('note');
    notes.forEach((note) => {
      // Skip rest notes
      if (note.querySelector('rest')) return;

      const pitchEl = note.querySelector('pitch');
      if (!pitchEl) return;

      const step = pitchEl.querySelector('step')?.textContent || '';
      const color = getNoteColor(step);

      // Create or modify notehead element
      let noteheadEl = note.querySelector('notehead');
      if (!noteheadEl) {
        noteheadEl = xmlDoc.createElement('notehead');
        note.appendChild(noteheadEl);
      }

      noteheadEl.setAttribute('color', color);
      noteheadEl.textContent = 'normal';
    });

    // Convert back to XML string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
  }
}
