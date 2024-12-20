export type NoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'H';

export interface Note {
  name: NoteName;
  color: string;
}

// Initial color scheme for white keys only
export const defaultNoteColors: Note[] = [
  { name: 'C', color: '#FF0000' }, // Red
  { name: 'D', color: '#FFA500' }, // Orange
  { name: 'E', color: '#FFFF00' }, // Yellow
  { name: 'F', color: '#008000' }, // Green
  { name: 'G', color: '#0000FF' }, // Blue
  { name: 'A', color: '#4B0082' }, // Indigo
  { name: 'H', color: '#9400D3' }, // Violet
];