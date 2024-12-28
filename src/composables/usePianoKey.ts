import { computed } from 'vue'

export function usePianoKey(props: { name: string; isBlack: boolean; color?: string }) {
  const getKeyStyle = computed(() => {
    if (props.isBlack) return {}
    return {
      backgroundColor: props.color,
    }
  })

  return {
    getKeyStyle,
  }
}
