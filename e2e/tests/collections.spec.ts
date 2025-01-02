import { test, expect } from '@playwright/test';
import { CollectionsPage } from '../pages/CollectionsPage.js';
import { TEST_DATA } from '../fixtures/testData.js';

test.describe('Collections', () => {
  let collectionsPage: CollectionsPage;
  const christmasCollection = TEST_DATA.collections.christmas;
  const firstSong = christmasCollection.songs[0];

  test.beforeEach(async ({ page }) => {
    collectionsPage = new CollectionsPage(page);
  });

  test('should load and display Christmas collection', async () => {
    await collectionsPage.goto();
    await collectionsPage.waitForCollectionsLoad();

    // Verify collection is visible
    expect(await collectionsPage.isCollectionVisible(christmasCollection.name)).toBeTruthy();

    // Open the Christmas collection
    await collectionsPage.openCollection(christmasCollection.name);
    expect(await collectionsPage.isCollectionVisible(christmasCollection.name)).toBeTruthy();

    // Get all songs and verify known songs are present
    const songs = await collectionsPage.getSongsList();
    expect(songs.length).toBeGreaterThan(0);

    // Verify specific songs
    expect(await collectionsPage.isSongVisible(firstSong.title)).toBeTruthy();
    expect(await collectionsPage.isSongVisible(christmasCollection.songs[1].title)).toBeTruthy();
  });

  test('should navigate through collection hierarchy', async () => {
    await collectionsPage.goto();
    await collectionsPage.waitForCollectionsLoad();

    // Open collection
    await collectionsPage.openCollection(christmasCollection.name);
    expect(await collectionsPage.getCollectionsTitle()).toContain('Collections');
  });

  test('should handle collection navigation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await collectionsPage.goto();
    await collectionsPage.waitForCollectionsLoad();

    // Test collection navigation
    await collectionsPage.openCollection(christmasCollection.name);
    expect(await collectionsPage.getCollectionsTitle()).toContain('Collections');

    // Verify songs are accessible
    const songs = await collectionsPage.getSongsList();
    expect(songs.length).toBeGreaterThan(0);
  });
});
