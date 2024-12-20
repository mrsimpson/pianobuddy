export class PrintService {
  private originalWidth: string | null = null;
  private resizeObserver: ResizeObserver | null = null;

  async print(onBeforePrint?: () => Promise<void>) {
    try {
      // Store original width
      this.originalWidth = document.documentElement.style.width;

      // Add print class to body to trigger print styles
      document.body.classList.add('preparing-print');

      // Set fixed width for print
      document.documentElement.style.width = '1200px';
      document.body.style.width = '1200px';

      // Wait for layout changes and execute pre-print callback
      await this.waitForLayout();
      if (onBeforePrint) {
        await onBeforePrint();
      }

      // Remove preparing class and add printing class
      document.body.classList.remove('preparing-print');
      document.body.classList.add('printing');

      // Trigger print
      window.print();

      // Reset after print
      this.reset();
    } catch (error) {
      console.error('Print error:', error);
      this.reset();
    }
  }

  private waitForLayout(): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        // Additional delay to ensure complete layout update
        setTimeout(resolve, 300);
      });
    });
  }

  private reset() {
    // Remove print classes
    document.body.classList.remove('preparing-print', 'printing');

    // Reset widths
    document.documentElement.style.width = this.originalWidth || '';
    document.body.style.width = '';
    this.originalWidth = null;

    // Cleanup resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}
