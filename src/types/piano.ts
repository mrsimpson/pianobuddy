import { internalToDisplayNote } from '../utils/noteMapping'

export interface PianoKey {
  name: string
  isBlack: boolean
  color?: string
  offset?: number
}

export const pianoKeys: PianoKey[] = [
  { name: 'C', isBlack: false, color: '#FF0000' },
  { name: 'C#', isBlack: true, color: '#E60000', offset: 12 },
  { name: 'D', isBlack: false, color: '#FFA500' },
  { name: 'Db', isBlack: true, color: '#CC8400', offset: 12 },
  { name: 'D#', isBlack: true, color: '#CC8400', offset: 26 },
  { name: 'E', isBlack: false, color: '#FFFF00' },
  { name: 'Eb', isBlack: true, color: '#CCCC00', offset: 26 },
  { name: 'F', isBlack: false, color: '#008000' },
  { name: 'F#', isBlack: true, color: '#006600', offset: 55 },
  { name: 'G', isBlack: false, color: '#0000FF' },
  { name: 'Gb', isBlack: true, color: '#0000CC', offset: 55 },
  { name: 'G#', isBlack: true, color: '#0000CC', offset: 70 },
  { name: 'A', isBlack: false, color: '#4B0082' },
  { name: 'Ab', isBlack: true, color: '#3C0068', offset: 70 },
  { name: 'A#', isBlack: true, color: '#3C0068', offset: 84 },
  { name: 'B', isBlack: false, color: '#9400D3' },
  { name: 'Bb', isBlack: true, color: '#7600A9', offset: 84 },
]

export function getNoteColor(pitch: string): string {
  const key = pianoKeys.find((k) => k.name === pitch)
  return key?.color || '#999999'
}

export const getPianoKeyDisplayName = (key: PianoKey): string => {
  return internalToDisplayNote(key.name)
}
