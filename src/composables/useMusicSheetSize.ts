import { ref, onMounted, onUnmounted } from 'vue';
import { MOBILE_BREAKPOINT } from './useResponsive';

export function useMusicSheetSize() {
  const containerRef = ref<HTMLElement | null>(null);
  const containerWidth = ref(0);
  
  const updateWidth = () => {
    if (containerRef.value) {
      containerWidth.value = containerRef.value.offsetWidth;
    }
  };
  
  const getScaleFactor = () => {
    if (!containerRef.value) return 1;
    
    const baseWidth = 1000; // Base width for desktop
    const parentWidth = containerRef.value.parentElement?.offsetWidth || window.innerWidth;
    const padding = window.innerWidth < MOBILE_BREAKPOINT ? 16 : 32; // Smaller padding on mobile
    const availableWidth = parentWidth - (padding * 2);
    
    return Math.min(1, availableWidth / baseWidth);
  };
  
  onMounted(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    // Initial update after a short delay to ensure proper layout
    setTimeout(updateWidth, 100);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });
  
  return {
    containerRef,
    containerWidth,
    getScaleFactor,
    updateWidth
  };
}
