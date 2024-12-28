import { describe, expect, it } from 'vitest'
import { decodeData, encodeData } from '../encoding'

describe('Encoding Utilities', () => {
  describe('encodeData', () => {
    const testCases = [
      // Simple objects
      [{ key: 'value' }, '%7B%22key%22%3A%22value%22%7D'],

      // Nested objects
      [{ nested: { inner: 'value' } }, '%7B%22nested%22%3A%7B%22inner%22%3A%22value%22%7D%7D'],

      // Arrays
      [[1, 2, 3], '%5B1%2C2%2C3%5D'],

      // Primitive values
      ['test string', 'test%20string'],
      [42, '42'],
      [true, 'true'],
    ]

    it.skip.each(testCases)('should encode %p correctly', (input, expectedEncoded) => {
      const encoded = encodeData(input)
      expect(encoded).toBe(expectedEncoded)
    })
  })

  describe('decodeData', () => {
    const testCases = [
      // Simple objects
      ['%7B%22key%22%3A%22value%22%7D', { key: 'value' }],

      // Nested objects
      ['%7B%22nested%22%3A%7B%22inner%22%3A%22value%22%7D%7D', { nested: { inner: 'value' } }],

      // Arrays
      ['%5B1%2C2%2C3%5D', [1, 2, 3]],

      // Primitive values
      ['test%20string', 'test string'],
      ['42', 42],
      ['true', true],
    ]

    it.skip.each(testCases)('should decode %p correctly', (encodedInput, expectedDecoded) => {
      const decoded = decodeData(encodedInput)
      expect(decoded).toEqual(expectedDecoded)
    })

    it('should throw error for invalid encoded data', () => {
      expect(() => decodeData('invalid{json')).toThrow('Invalid data format')
    })
  })
})
