import { describe, expect, it } from 'vitest'
import { getLuminance, getRGB, shouldUseDarkText } from '../colorUtils'

describe('Color Utilities', () => {
  describe('getRGB', () => {
    const testCases = [
      ['#FF0000', { r: 255, g: 0, b: 0 }], // Red
      ['#00FF00', { r: 0, g: 255, b: 0 }], // Green
      ['#0000FF', { r: 0, g: 0, b: 255 }], // Blue
      ['rgb(100, 150, 200)', { r: 100, g: 150, b: 200 }], // RGB format
    ]

    it.each(testCases)('should convert %s to correct RGB', (color, expected) => {
      expect(getRGB(color)).toEqual(expected)
    })

    it('should handle invalid color formats', () => {
      expect(getRGB('invalid')).toEqual({ r: 0, g: 0, b: 0 })
    })
  })

  describe('getLuminance', () => {
    const testCases = [
      [{ r: 255, g: 255, b: 255 }, 1], // White
      [{ r: 0, g: 0, b: 0 }, 0], // Black
      [{ r: 255, g: 0, b: 0 }, 0.2126], // Red
    ]

    it.each(testCases)('should calculate luminance correctly', (rgb, expected) => {
      expect(Math.round(getLuminance(rgb) * 10000) / 10000).toBe(expected)
    })
  })

  describe.skip('shouldUseDarkText', () => {
    const testCases = [
      ['#FFFFFF', true], // White background
      ['#000000', false], // Black background
      ['#42B883', true], // Light green
      ['#1A1A1A', false], // Dark background
    ]

    it.each(testCases)(
      'should determine text color for %s',
      (backgroundColor, expectedDarkText) => {
        expect(shouldUseDarkText(backgroundColor)).toBe(expectedDarkText)
      },
    )
  })
})
