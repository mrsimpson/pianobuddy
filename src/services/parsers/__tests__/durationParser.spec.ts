import { beforeEach, describe, expect, it } from 'vitest';
import { DurationParser } from '../durationParser';

describe('DurationParser', () => {
  let mockMeasureElement: Element;

  beforeEach(() => {
    // Create a mock measure element
    mockMeasureElement = document.createElement('measure');
    const attributesEl = document.createElement('attributes');
    const divisionsEl = document.createElement('divisions');
    divisionsEl.textContent = '4';
    attributesEl.appendChild(divisionsEl);
    mockMeasureElement.appendChild(attributesEl);
  });

  describe('parseAttributes', () => {
    it('should set divisions per quarter note', () => {
      DurationParser.parseAttributes(mockMeasureElement);

      // Use private method access via reflection
      expect((DurationParser as any)['divisionsPerQuarter']).toBe(4);
    });

    it('should handle missing divisions', () => {
      const emptyMeasure = document.createElement('measure');

      DurationParser.parseAttributes(emptyMeasure);

      // Should not throw an error
      expect(true).toBe(true);
    });
  });

  describe('parseDuration', () => {
    let mockNoteElement: Element;

    beforeEach(() => {
      mockNoteElement = document.createElement('note');
      const durationEl = document.createElement('duration');
      durationEl.textContent = '4';
      const typeEl = document.createElement('type');
      typeEl.textContent = 'quarter';

      mockNoteElement.appendChild(durationEl);
      mockNoteElement.appendChild(typeEl);
    });

    it('should parse note duration correctly', () => {
      const duration = DurationParser.parseDuration(mockNoteElement);

      expect(duration).toEqual({
        divisions: 4,
        type: 'quarter',
        relativeLength: 1,
      });
    });

    it('should handle missing duration or type', () => {
      const incompleteNoteElement = document.createElement('note');

      const duration = DurationParser.parseDuration(incompleteNoteElement);

      expect(duration).toEqual({
        divisions: 1,
        type: 'quarter',
        relativeLength: 1,
      });
    });

    it('should use default values for missing elements', () => {
      const emptyNoteElement = document.createElement('note');

      const duration = DurationParser.parseDuration(emptyNoteElement);

      expect(duration).toEqual({
        divisions: 1,
        type: 'quarter',
        relativeLength: 1,
      });
    });
  });
});
