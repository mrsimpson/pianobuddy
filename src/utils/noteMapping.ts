// Map display names to internal names
export const displayToInternalNote = (note: string): string => {
  return note === 'H' ? 'B' : note;
};

// Map internal names to display names (for German/Nordic notation)
export const internalToDisplayNote = (note: string): string => {
  return note === 'B' ? 'H' : note;
};

// Format a complete note (including octave) for display
export const formatNoteForDisplay = (note: string, octave: number): string => {
  const displayNote = internalToDisplayNote(note);
  return `${displayNote}${octave}`;
};
