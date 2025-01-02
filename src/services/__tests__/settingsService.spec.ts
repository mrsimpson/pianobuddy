import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SettingsService } from '../settingsService'
import { getDatabase } from '../database'

vi.mock('../database', () => ({
  getDatabase: vi.fn(),
}))

describe('SettingsService', () => {
  const mockDb = {
    settings: {
      get: vi.fn(),
      put: vi.fn(),
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getDatabase as ReturnType<typeof vi.fn>).mockReturnValue(mockDb)
  })

  describe('getSetting', () => {
    it('should return setting value when exists', async () => {
      mockDb.settings.get.mockResolvedValue({ key: 'test', value: 'value' })

      const value = await SettingsService.getSetting('test')
      expect(value).toBe('value')
      expect(mockDb.settings.get).toHaveBeenCalledWith('test')
    })

    it('should return null when setting does not exist', async () => {
      mockDb.settings.get.mockResolvedValue(null)

      const value = await SettingsService.getSetting('nonexistent')
      expect(value).toBeNull()
    })
  })

  describe('setSetting', () => {
    it('should save setting', async () => {
      await SettingsService.setSetting('test', 'value')

      expect(mockDb.settings.put).toHaveBeenCalledWith({
        key: 'test',
        value: 'value',
      })
    })
  })

  describe('display mode settings', () => {
    it('should get default display mode when not set', async () => {
      mockDb.settings.get.mockResolvedValue(null)

      const mode = await SettingsService.getDisplayMode()
      expect(mode).toBe('all')
    })

    it('should get saved display mode', async () => {
      mockDb.settings.get.mockResolvedValue({ value: 'sheet' })

      const mode = await SettingsService.getDisplayMode()
      expect(mode).toBe('sheet')
    })

    it('should save display mode', async () => {
      await SettingsService.setDisplayMode('playalong')

      expect(mockDb.settings.put).toHaveBeenCalledWith({
        key: 'displayMode',
        value: 'playalong',
      })
    })
  })
})
