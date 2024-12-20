import { onMounted, onUnmounted } from 'vue';

export function usePrintHandler() {
  const handleBeforePrint = (e: BeforeUnloadEvent) => {
    // Cancel the default print dialog if it's not triggered by our print service
    if (!document.body.classList.contains('printing')) {
      e.preventDefault();
      return;
    }
  };

  const handleAfterPrint = () => {
    document.body.classList.remove('printing');
  };

  onMounted(() => {
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeprint', handleBeforePrint);
    window.removeEventListener('afterprint', handleAfterPrint);
  });
}
