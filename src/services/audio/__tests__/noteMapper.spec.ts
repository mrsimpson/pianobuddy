import { describe, expect, it } from 'vitest';
import { NoteMapper } from '../noteMapper';

describe('NoteMapper', () => {
  const testCases = [
    // Note, Octave, Expected Frequency
    ['A', 4, 440], // Standard A4 reference pitch
    ['C', 4, 261.63], // Middle C
    ['G', 3, 196], // Lower octave
    ['B', 5, 987.77], // Higher octave
  ];

  it.each(testCases)(
    'should calculate frequency for %s%d correctly',
    (note, octave, expectedFreq) => {
      const frequency = NoteMapper.getFrequency(note, octave);
      expect(Math.round(frequency)).toBe(Math.round(expectedFreq));
    },
  );

  it('should handle accidental notes', () => {
    const sharpFreq = NoteMapper.getFrequency('C#', 4);
    const flatFreq = NoteMapper.getFrequency('Db', 4);

    expect(Math.round(sharpFreq)).toBe(277);
  });

  it('should throw error for invalid notes', () => {
    expect(() => NoteMapper.getFrequency('X', 4)).toThrow(
      'Failed to calculate frequency',
    );
  });
});
