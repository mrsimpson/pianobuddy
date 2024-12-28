import { describe, expect, it } from 'vitest'
import { usePartsExtractor } from '../usePartsExtractor'

describe('usePartsExtractor', () => {
  it('should initialize with empty parts', () => {
    const { parts } = usePartsExtractor()

    expect(parts.value).toEqual([])
  })

  it('should allow updating parts', () => {
    const { parts } = usePartsExtractor()

    const mockParts = [
      {
        id: 'part1',
        name: 'Piano',
        notes: [
          {
            pitch: 'C',
            octave: 4,
            duration: { divisions: 4, type: 'quarter', relativeLength: 1 },
          },
        ],
      },
      {
        id: 'part2',
        name: 'Violin',
        notes: [
          {
            pitch: 'G',
            octave: 5,
            duration: { divisions: 2, type: 'half', relativeLength: 2 },
          },
        ],
      },
    ]

    parts.value = mockParts

    expect(parts.value).toEqual(mockParts)
    expect(parts.value.length).toBe(2)
  })
})
