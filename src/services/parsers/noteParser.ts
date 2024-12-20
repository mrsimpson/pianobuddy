import { ParsedNote } from '../../types/musicxml';
import { DurationParser } from './durationParser';

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
    const octave = parseInt(
      pitchEl.querySelector('octave')?.textContent || '4',
    );
    const duration = DurationParser.parseDuration(noteElement);
    const lyricEl = noteElement.querySelector('lyric');
    const lyric = lyricEl?.querySelector('text')?.textContent || '';

    return {
      pitch: step,
      duration,
      octave,
      isRest: false,
      lyric,
    };
  }
}
