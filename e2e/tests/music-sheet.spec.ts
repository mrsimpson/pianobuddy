import { test, expect } from '@playwright/test';
import { MusicSheetPage } from '../pages/MusicSheetPage.js';
import { TEST_DATA } from '../fixtures/testData.js';
import { CollectionsPage } from '../pages/CollectionsPage.js';
import { LibraryPage } from '../pages/LibraryPage.js';

test.describe('Music Sheet Display', () => {
  let musicSheetPage: MusicSheetPage;
  let collectionsPage: CollectionsPage;
  let libraryPage: LibraryPage;
  const firstSong = TEST_DATA.collections.christmas.songs[0];
  let firstSongId: string

  test.beforeEach(async ({ page }) => {
    musicSheetPage = new MusicSheetPage(page);
    collectionsPage = new CollectionsPage(page)
    libraryPage = new LibraryPage(page)

    // reset the library before each test
    await libraryPage.goto()
    await libraryPage.clearLibrary()

    // Import the first song before each test
    await collectionsPage.goto()
    await collectionsPage.waitForCollectionsLoad()
    await collectionsPage.openCollection(TEST_DATA.collections.christmas.name)
    await collectionsPage.importSong(firstSong.id)

    await libraryPage.goto()
    firstSongId = await libraryPage.getSongIdByTitle(firstSong.title)
  });

  test('should render Christmas song correctly', async () => {
    await musicSheetPage.goto(firstSongId);
    await musicSheetPage.waitForMusicSheetRender();

    // Verify music sheet is visible
    expect(await musicSheetPage.isMusicSheetVisible()).toBeTruthy();
    expect(await musicSheetPage.isMusicSheetContainerVisible()).toBeTruthy();
    expect(await musicSheetPage.getErrorMessage()).toBeNull();
  });

  test('should maintain music sheet visibility on different screen sizes', async ({ page }) => {
    await musicSheetPage.goto(firstSongId);
    await musicSheetPage.waitForMusicSheetRender();

    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 });
    expect(await musicSheetPage.isMusicSheetVisible()).toBeTruthy();

    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    expect(await musicSheetPage.isMusicSheetVisible()).toBeTruthy();

    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    expect(await musicSheetPage.isMusicSheetVisible()).toBeTruthy();
  });

  test('should toggle between display modes', async () => {

    await musicSheetPage.goto(firstSongId);

    // Initially both sheet and playalong should be visible (ALL mode)
    await expect(musicSheetPage.getMusicSheet()).toBeVisible()
    await expect(musicSheetPage.getPlayalong()).toBeVisible()

    // Switch to Sheet mode
    await musicSheetPage.setDisplayMode('sheet')
    await expect(musicSheetPage.getMusicSheet()).toBeVisible()
    await expect(musicSheetPage.getPlayalong()).not.toBeVisible()

    // Switch to Playalong mode
    await musicSheetPage.setDisplayMode('playalong')
    await expect(musicSheetPage.getMusicSheet()).not.toBeVisible()
    await expect(musicSheetPage.getPlayalong()).toBeVisible()

    // Switch back to All mode
    await musicSheetPage.setDisplayMode('all')
    await expect(musicSheetPage.getMusicSheet()).toBeVisible()
    await expect(musicSheetPage.getPlayalong()).toBeVisible()
  })
});
