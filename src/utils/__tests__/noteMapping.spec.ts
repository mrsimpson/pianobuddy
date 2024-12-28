import { describe, expect, it } from 'vitest'
import { displayToInternalNote, formatNoteForDisplay, internalToDisplayNote } from '../noteMapping'

describe.skip('Note Mapping Utilities', () => {
  describe('displayToInternalNote', () => {
    const testCases = [
      ['B', 'H'], // German notation conversion
      ['C', 'C'], // No change for other notes
    ]

    it.each(testCases)(
      'should convert display note %s to internal note %s',
      (displayNote, expectedInternalNote) => {
        expect(displayToInternalNote(displayNote)).toBe(expectedInternalNote)
      },
    )
  })

  describe('internalToDisplayNote', () => {
    const testCases = [
      ['H', 'B'], // German notation conversion
      ['C', 'C'], // No change for other notes
    ]

    it.each(testCases)(
      'should convert internal note %s to display note %s',
      (internalNote, expectedDisplayNote) => {
        expect(internalToDisplayNote(internalNote)).toBe(expectedDisplayNote)
      },
    )
  })

  describe('formatNoteForDisplay', () => {
    const testCases = [
      ['H', 4, 'B4'], // German notation conversion with octave
      ['C', 5, 'C5'], // Standard note
    ]

    it.each(testCases)('should format note %s%d correctly', (note, octave, expectedDisplay) => {
      expect(formatNoteForDisplay(note, octave)).toBe(expectedDisplay)
    })
  })
})
