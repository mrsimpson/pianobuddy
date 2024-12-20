export class NoteMapper {
  private static readonly A4_FREQUENCY = 440; // A4 note frequency in Hz
  private static readonly SEMITONE_RATIO = Math.pow(2, 1 / 12);

  private static readonly NOTE_OFFSETS: Record<string, number> = {
    C: -9,
    'C#': -8,
    D: -7,
    'D#': -6,
    E: -5,
    F: -4,
    'F#': -3,
    G: -2,
    'G#': -1,
    A: 0,
    'A#': 1,
    B: 2, // Changed from H to B
  };

  static getFrequency(note: string, octave: number): number {
    try {
      const baseNote = note.replace(/[0-9]/g, '').toUpperCase();
      const offset = this.NOTE_OFFSETS[baseNote];

      if (offset === undefined) {
        throw new Error(`Invalid note: ${note}`);
      }

      // Calculate octave difference from A4
      const octaveDiff = octave - 4;
      const totalSemitones = offset + octaveDiff * 12;

      // Calculate frequency using equal temperament formula
      return this.A4_FREQUENCY * Math.pow(this.SEMITONE_RATIO, totalSemitones);
    } catch (error) {
      console.error('NoteMapper getFrequency error:', error);
      throw new Error(`Failed to calculate frequency for note: ${note}`);
    }
  }
}
