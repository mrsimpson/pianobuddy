import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LibraryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigateTo('/library');
  }

  async clearLibrary() {
    const songs = await this.page.getByTestId('song-list').all()

    // confirm the deletion
    this.page.on('dialog', dialog => dialog.accept());
    for (const song of songs) {
      await song.getByTestId('delete-song').click();

    }
    // reset the dialog listener
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  async getSongIdByTitle(title: string) {
    const firstSong = await this.page.getByTestId('song-list').getByText(title).locator('..')
    console.log(firstSong)
    const songAttr = await firstSong.getAttribute('data-testid')
    const songId = songAttr?.split('-').slice(1).join('-')
    if (!songId) {
      throw new Error('No song found in library')
    }
    return songId
  }
}
