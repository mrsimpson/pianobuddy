import { pianoKeys } from '../types/piano'
import type { DurationInfo, ParsedNote } from '../types/musicxml'
import { shouldUseDarkText } from '../utils/colorUtils'

const BASE_WIDTH = 60
const MIN_NOTE_WIDTH = 40

export function useNoteVisualizer() {
  const getNoteColor = (pitch: string): string => {
    const key = pianoKeys.find((k) => k.name === pitch)
    return key?.color || '#999999'
  }

  const getDurationWidth = (duration: DurationInfo): number => {
    return Math.max(duration.relativeLength * BASE_WIDTH, MIN_NOTE_WIDTH)
  }

  const getNoteStyle = (note: ParsedNote): Record<string, string> => {
    if (note.isRest) {
      return {
        width: `${getDurationWidth(note.duration)}px`,
        minWidth: `${MIN_NOTE_WIDTH}px`,
      }
    }

    const backgroundColor = getNoteColor(note.pitch)
    const textColor = shouldUseDarkText(backgroundColor) ? '#000000' : '#ffffff'

    return {
      backgroundColor,
      color: textColor,
      width: `${getDurationWidth(note.duration)}px`,
      minWidth: `${MIN_NOTE_WIDTH}px`,
    }
  }

  return {
    getNoteStyle,
    getNoteColor,
    getDurationWidth,
  }
}
