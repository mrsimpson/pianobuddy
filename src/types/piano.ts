import { internalToDisplayNote } from '../utils/noteMapping';

export interface PianoKey {
  name: string;
  isBlack: boolean;
  color?: string;
  offset?: number;
}

export const pianoKeys: PianoKey[] = [
  { name: 'C', isBlack: false, color: '#FF0000' },
  { name: 'C#', isBlack: true, offset: 12 },
  { name: 'D', isBlack: false, color: '#FFA500' },
  { name: 'D#', isBlack: true, offset: 26 },
  { name: 'E', isBlack: false, color: '#FFFF00' },
  { name: 'F', isBlack: false, color: '#008000' },
  { name: 'F#', isBlack: true, offset: 55 },
  { name: 'G', isBlack: false, color: '#0000FF' },
  { name: 'G#', isBlack: true, offset: 70 },
  { name: 'A', isBlack: false, color: '#4B0082' },
  { name: 'A#', isBlack: true, offset: 84 },
  { name: 'B', isBlack: false, color: '#9400D3' },
];

// Helper function to get display name for UI
export const getPianoKeyDisplayName = (key: PianoKey): string => {
  return internalToDisplayNote(key.name);
};
