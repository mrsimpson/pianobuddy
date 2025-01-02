import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class NavigationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.navigateTo('/');
    }

    async getNavLinksVisibility() {
        return {
            library: await this.isNavLinkVisible('nav-link-library'),
            collections: await this.isNavLinkVisible('nav-link-collections'),
            config: await this.isNavLinkVisible('nav-link-config')
        };
    }

    async isBurgerMenuVisible() {
        return this.page.getByTestId('nav-burger').isVisible();
    }

    async isNavMenuVisible() {
        return this.page.getByTestId('nav-links').isVisible();
    }

    async navigateToLibrary() {
        await this.clickNavLink('nav-link-library');
    }

    async navigateToCollections() {
        await this.clickNavLink('nav-link-collections');
    }

    async navigateToConfig() {
        await this.clickNavLink('nav-link-config');
    }
}
