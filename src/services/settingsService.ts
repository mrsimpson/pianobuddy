import { getDatabase } from './database'

export const SettingKeys = {
  DISPLAY_MODE: 'displayMode',
} as const

export class SettingsService {
  static async getSetting(key: string): Promise<string | null> {
    const db = getDatabase()
    const setting = await db.settings.get(key)
    return setting?.value ?? null
  }

  static async setSetting(key: string, value: string): Promise<void> {
    const db = getDatabase()
    await db.settings.put({
      key,
      value,
    })
  }

  static async getDisplayMode(): Promise<string> {
    return (await this.getSetting(SettingKeys.DISPLAY_MODE)) ?? 'all'
  }

  static async setDisplayMode(mode: string): Promise<void> {
    await this.setSetting(SettingKeys.DISPLAY_MODE, mode)
  }
}
