export interface ParsedNote {
  pitch: string;
  duration: number;
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
