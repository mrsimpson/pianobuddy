import { onMounted, ref } from 'vue'
import { SettingsService } from '@/services/settingsService'

export function useDisplayMode() {
  const displayMode = ref<string | undefined>(undefined)

  const setDisplayMode = async (mode: string) => {
    displayMode.value = mode
    await SettingsService.setDisplayMode(mode)
  }

  onMounted(async () => {
    displayMode.value = await SettingsService.getDisplayMode()
  })

  return {
    displayMode,
    setDisplayMode,
  }
}
