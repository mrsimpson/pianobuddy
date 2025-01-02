import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage.js';

test.describe('Navigation', () => {
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        navigationPage = new NavigationPage(page);
        await navigationPage.goto();
    });

    test('should display all navigation links on desktop', async () => {
        const links = await navigationPage.getNavLinksVisibility();
        expect(links.library).toBeTruthy();
        expect(links.collections).toBeTruthy();
        expect(links.config).toBeTruthy();
    });

    test('should hide navigation links behind burger menu on mobile', async ({ page }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 600, height: 800 });

        // Burger should be visible, menu should be hidden
        expect(await navigationPage.isBurgerMenuVisible()).toBeTruthy();
        expect(await navigationPage.isNavMenuVisible()).toBeFalsy();

        // Click burger to show menu
        await navigationPage.toggleMobileMenu();
        expect(await navigationPage.isNavMenuVisible()).toBeTruthy();
    });

    test('should close mobile menu when navigation occurs', async ({ page }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 600, height: 800 });

        // Open menu and navigate
        await navigationPage.toggleMobileMenu();
        await navigationPage.navigateToLibrary();

        // Menu should be closed
        expect(await navigationPage.isNavMenuVisible()).toBeFalsy();
    });

    test('should navigate between routes', async ({ page }) => {
        // Navigate to Library
        await navigationPage.navigateToLibrary();
        expect(page.url()).toContain('/library');

        // Navigate to Collections
        await navigationPage.navigateToCollections();
        expect(page.url()).toContain('/collections');

        // Navigate to Config
        await navigationPage.navigateToConfig();
        expect(page.url()).toContain('/config');
    });
});
