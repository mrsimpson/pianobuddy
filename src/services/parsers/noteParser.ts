export class NoteParser {
  static parseNote(noteElement: Element): ParsedNote | null {
    // Check if it's a rest
    const isRest = noteElement.querySelector('rest') !== null;
    
    if (isRest) {
      const duration = parseInt(noteElement.querySelector('duration')?.textContent || '1');
      return {
        pitch: 'rest',
        duration,
        octave: 4,
        isRest: true
      };
    }

    const pitchEl = noteElement.querySelector('pitch');
    if (!pitchEl) return null;

    const step = pitchEl.querySelector('step')?.textContent || '';
    const octave = parseInt(pitchEl.querySelector('octave')?.textContent || '4');
    const duration = parseInt(noteElement.querySelector('duration')?.textContent || '1');
    const lyricEl = noteElement.querySelector('lyric');
    const lyric = lyricEl?.querySelector('text')?.textContent || '';

    return {
      pitch: step,
      duration,
      octave,
      isRest: false,
      lyric
    };
  }

  static parseNotes(part: Element): ParsedNote[] {
    const notes: ParsedNote[] = [];
    const noteElements = part.querySelectorAll('note');

    noteElements.forEach(noteEl => {
      const parsedNote = this.parseNote(noteEl);
      if (parsedNote) {
        notes.push(parsedNote);
      }
    });

    return notes;
  }
}
