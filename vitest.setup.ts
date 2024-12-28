import { vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.mocks = { $t: (tKey: string) => tKey }

// Mock browser APIs and global objects
Object.defineProperty(window, 'AudioContext', {
  value: class AudioContext {
    createGain = vi.fn().mockReturnValue({
      connect: vi.fn(),
      gain: { value: 0, setValueAtTime: vi.fn() },
    })
    createOscillator = vi.fn().mockReturnValue({
      type: 'sine',
      frequency: { setValueAtTime: vi.fn() },
      detune: { setValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null,
    })
    currentTime = 0
    destination = {}
    resume = vi.fn()
    suspend = vi.fn()
  },
  writable: true,
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString()
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
