import { computed } from 'vue';
import type { PianoKey } from '../types/piano';

export function usePianoKey(props: { name: string; isBlack: boolean; color?: string }) {
  const getKeyStyle = computed(() => {
    if (props.isBlack) return {};
    return {
      backgroundColor: props.color
    };
  });

  return {
    getKeyStyle
  };
}
