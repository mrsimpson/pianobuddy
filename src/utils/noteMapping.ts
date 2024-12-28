// Constants for note mapping
const NOTE_MAPPINGS = {
  internal: {
    B: 'H', // German/Nordic notation
  },
  display: {
    H: 'B',
  },
} as const

// Map display names to internal names
export const displayToInternalNote = (note: string): string => {
  return NOTE_MAPPINGS.display[note as keyof typeof NOTE_MAPPINGS.display] || note
}

// Map internal names to display names (for German/Nordic notation)
export const internalToDisplayNote = (note: string): string => {
  return NOTE_MAPPINGS.internal[note as keyof typeof NOTE_MAPPINGS.internal] || note
}

// Format a complete note (including octave) for display
export const formatNoteForDisplay = (note: string, octave: number): string => {
  const displayNote = internalToDisplayNote(note)
  return `${displayNote}${octave}`
}
