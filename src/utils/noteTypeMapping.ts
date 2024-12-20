export const NOTE_TYPE_LENGTHS: Record<string, number> = {
  maxima: 32,
  long: 16,
  breve: 8,
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  '16th': 0.25,
  '32nd': 0.125,
  '64th': 0.0625,
  '128th': 0.03125,
  '256th': 0.015625,
};

export function getNoteTypeLength(type: string): number {
  return NOTE_TYPE_LENGTHS[type] || 1; // Default to quarter note length
}
