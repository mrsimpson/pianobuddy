import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CollectionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigateTo('/collections');
  }

  async openCollection(name: string) {
    await this.page.getByTestId('collection-name').getByText(name).click();
  }

  async openSong(title: string) {
    await this.page.getByTestId('song-name').getByText(title).click();
  }

  async isMusicSheetVisible() {
    return this.page.getByTestId('music-sheet').isVisible();
  }

  async isCollectionVisible(name: string) {
    return this.page.getByTestId('collection-name').getByText(name).isVisible();
  }

  async isSongVisible(name: string) {
    return this.page.getByTestId('song-item').getByText(name).isVisible();
  }

  async getSongsList() {
    // Wait for any songs to be visible
    await this.page.waitForSelector('[data-testid="song-item"]', { timeout: 5000 });
    return this.page.getByTestId('song-item').all();
  }

  async getCollectionsTitle() {
    return this.page.getByTestId('collections-title').textContent();
  }

  async waitForCollectionsLoad() {
    await this.page.waitForSelector('[data-testid="collections-list"]', { state: 'visible' });
  }

  async importSong(songId: string) {
    await this.page.getByTestId(`song-import-button-${songId}`).click()

    // Wait for import to complete
    await this.page.getByTestId(`song-import-button-${songId}`).isDisabled()
  }
}
