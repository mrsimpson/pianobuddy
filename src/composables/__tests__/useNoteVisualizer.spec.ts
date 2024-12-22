import { describe, expect, it } from 'vitest';
import { useNoteVisualizer } from '../useNoteVisualizer';

describe('useNoteVisualizer', () => {
  const { getNoteStyle, getNoteColor, getDurationWidth } = useNoteVisualizer();

  const testNotes = [
    {
      pitch: 'C',
      duration: { relativeLength: 1 },
      isRest: false,
    },
    {
      pitch: 'D',
      duration: { relativeLength: 2 },
      isRest: false,
    },
    {
      pitch: 'rest',
      duration: { relativeLength: 0.5 },
      isRest: true,
    },
  ];

  describe('getNoteColor', () => {
    it('should return color for existing notes', () => {
      const color = getNoteColor('C');
      expect(color).toBe('#FF0000'); // Red for C note
    });

    it('should return default color for unknown notes', () => {
      const color = getNoteColor('X');
      expect(color).toBe('#999999');
    });
  });

  describe('getDurationWidth', () => {
    it('should calculate width based on relative length', () => {
      const widths = testNotes.map((note) => getDurationWidth(note.duration));

      expect(widths[0]).toBe(60); // Standard quarter note
      expect(widths[1]).toBe(120); // Longer note
      expect(widths[2]).toBe(30); // Shorter note
    });

    it('should have minimum width', () => {
      const shortNote = { relativeLength: 0.1 };
      const width = getDurationWidth(shortNote);

      expect(width).toBe(40); // Minimum width
    });
  });

  describe('getNoteStyle', () => {
    it('should generate style for regular notes', () => {
      const style = getNoteStyle(testNotes[0]);

      expect(style).toHaveProperty('backgroundColor', '#FF0000');
      expect(style).toHaveProperty('width', '60px');
      expect(style).toHaveProperty('minWidth', '40px');
    });

    it('should generate style for rest notes', () => {
      const style = getNoteStyle(testNotes[2]);

      expect(style).toHaveProperty('width', '30px');
      expect(style).toHaveProperty('minWidth', '40px');
    });
  });
});
