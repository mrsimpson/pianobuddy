export interface DurationInfo {
  divisions: number; // Raw duration value in divisions
  type: string; // Visual note type (quarter, half, etc.)
  relativeLength: number; // Duration relative to quarter note (1.0 = quarter)
}

export interface ParsedNote {
  pitch: string;
  duration: DurationInfo;
  octave: number;
  isRest?: boolean;
  lyric?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface MusicPart {
  id: string;
  name: string;
  notes: ParsedNote[];
}

export interface PartInfo {
  id: string;
  name: string;
}
