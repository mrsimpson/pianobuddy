export interface DurationInfo {
  divisions: number
  type: string
  relativeLength: number
}

export interface ParsedNote {
  pitch: string
  duration: DurationInfo
  octave: number
  isRest?: boolean
  lyric?: string
  alter?: number // Added alter property for accidentals
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface MusicPart {
  id: string
  name: string
  notes: ParsedNote[]
}

export interface PartInfo {
  id: string
  name: string
}
