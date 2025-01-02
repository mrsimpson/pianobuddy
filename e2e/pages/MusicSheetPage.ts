import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class MusicSheetPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(songPath: string) {
    await this.navigateTo(`/song/${songPath}`);
  }

  async isMusicSheetVisible() {
    return this.page.getByTestId('music-sheet').isVisible();
  }

  async isMusicSheetContainerVisible() {
    return this.page.getByTestId('music-sheet-container').isVisible();
  }

  async getErrorMessage() {
    const errorElement = this.page.getByTestId('music-sheet-error');
    if (await errorElement.isVisible()) {
      return errorElement.textContent();
    }
    return null;
  }

  async waitForMusicSheetRender() {
    await this.page.getByTestId('music-sheet-container').waitFor({ state: 'visible' });
    // Add a small delay to ensure OSMD has finished rendering
    await this.page.waitForTimeout(1000);
  }

  getMusicSheet() {
    return this.page.getByTestId('music-sheet');
  }

  getPlayalong() {
    return this.page.getByTestId('notes-visualization');
  }

  async setDisplayMode(mode: 'all' | 'sheet' | 'playalong') {
    await this.page.getByTestId(`display-mode-${mode}`).click();
  }
}
