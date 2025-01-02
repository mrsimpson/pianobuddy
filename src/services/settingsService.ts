import { getDatabase } from './database'

export const SettingKeys = {
  DISPLAY_MODE: 'displayMode',
} as const

export class SettingsService {
  static async getSetting(key: string): Promise<string | null> {
    const db = await getDatabase()
    const doc = await db.settings.findOne(key).exec()
    return doc?.value ?? null
  }

  static async setSetting(key: string, value: string): Promise<void> {
    const db = await getDatabase()
    await db.settings.upsert({
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
