import { pianoKeys } from '../types/piano';
import type { ParsedNote } from '../types/musicxml';
import { shouldUseDarkText } from '../utils/colorUtils';

const UNIT_WIDTH = 120; // Base width for quarter notes
const MIN_NOTE_WIDTH = 40; // Reduced minimum width

export function useNoteVisualizer() {
  const getNoteColor = (pitch: string): string => {
    const key = pianoKeys.find(k => k.name.startsWith(pitch));
    return key?.color || '#999999';
  };

  const getDurationWidth = (duration: number): number => {
    // Duration 4 is a quarter note, scale accordingly
    return Math.max(duration * (UNIT_WIDTH / 4), MIN_NOTE_WIDTH);
  };

  const getNoteStyle = (note: ParsedNote): Record<string, string> => {
    if (note.isRest) {
      return {
        width: `${getDurationWidth(note.duration)}px`,
        minWidth: `${MIN_NOTE_WIDTH}px`
      };
    }

    const backgroundColor = getNoteColor(note.pitch);
    const textColor = shouldUseDarkText(backgroundColor) ? '#000000' : '#ffffff';

    return {
      backgroundColor,
      color: textColor,
      width: `${getDurationWidth(note.duration)}px`,
      minWidth: `${MIN_NOTE_WIDTH}px`
    };
  };

  return {
    getNoteStyle,
    getNoteColor,
    getDurationWidth
  };
}