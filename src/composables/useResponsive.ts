import {onMounted, onUnmounted, ref} from 'vue';

export const MOBILE_BREAKPOINT = 800;

export function useResponsive() {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });

  return {
    isMobile,
  };
}
