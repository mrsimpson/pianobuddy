import { describe, expect, it } from 'vitest';
import { getNoteTypeLength, NOTE_TYPE_LENGTHS } from '../noteTypeMapping';

describe('Note Type Mapping', () => {
  describe('NOTE_TYPE_LENGTHS', () => {
    const expectedLengths = {
      maxima: 32,
      long: 16,
      breve: 8,
      whole: 4,
      half: 2,
      quarter: 1,
      eighth: 0.5,
      '16th': 0.25,
      '32nd': 0.125,
      '64th': 0.0625,
      '128th': 0.03125,
      '256th': 0.015625,
    };

    it('should have correct predefined note type lengths', () => {
      Object.entries(expectedLengths).forEach(([type, length]) => {
        expect(NOTE_TYPE_LENGTHS[type]).toBe(length);
      });
    });
  });

  describe('getNoteTypeLength', () => {
    const testCases = [
      ['whole', 4],
      ['half', 2],
      ['quarter', 1],
      ['eighth', 0.5],
      ['unknown', 1], // Default to quarter note
    ];

    it.each(testCases)(
      'should return correct length for %s note type',
      (type, expectedLength) => {
        expect(getNoteTypeLength(type)).toBe(expectedLength);
      },
    );

    it('should default to quarter note length for unknown types', () => {
      expect(getNoteTypeLength('nonexistent')).toBe(1);
    });
  });
});
