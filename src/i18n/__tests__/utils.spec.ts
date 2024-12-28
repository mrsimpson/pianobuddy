import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBrowserLocale, getInitialLocale } from '../utils'

describe('I18n Utilities', () => {
  const originalNavigator = { ...window.navigator }
  const originalLocalStorage = { ...window.localStorage }

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks()

    // Reset localStorage
    localStorage.clear()
  })

  describe('getBrowserLocale', () => {
    const testCases = [
      ['en-US', 'en'],
      ['de-DE', 'de'],
      ['fr-FR', 'en'], // Unsupported locale
      ['zh-CN', 'en'], // Another unsupported locale
    ]

    it.each(testCases)('should extract locale from %s', (fullLocale, expectedLocale) => {
      // Mock navigator.language
      Object.defineProperty(window.navigator, 'language', {
        value: fullLocale,
        configurable: true,
      })

      expect(getBrowserLocale()).toBe(expectedLocale)
    })
  })

  describe('getInitialLocale', () => {
    it.skip('should prioritize saved locale from localStorage', () => {
      // Set saved locale in localStorage
      localStorage.setItem('userLocale', 'de')

      expect(getInitialLocale()).toBe('de')
    })

    it('should fallback to browser locale when no saved locale', () => {
      // Mock navigator.language
      Object.defineProperty(window.navigator, 'language', {
        value: 'de-DE',
        configurable: true,
      })

      expect(getInitialLocale()).toBe('de')
    })

    it('should use English for unsupported locales', () => {
      // Mock navigator.language with unsupported locale
      Object.defineProperty(window.navigator, 'language', {
        value: 'fr-FR',
        configurable: true,
      })

      expect(getInitialLocale()).toBe('en')
    })
  })

  // Cleanup after tests
  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
    })
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    })
  })
})
