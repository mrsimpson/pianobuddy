import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) { }

  async navigateTo(path: string) {
    await this.page.goto(`#${path}`);
  }

  async clickNavLink(linkTestId: string) {
    await this.page.getByTestId(linkTestId).click();
  }

  async isNavLinkVisible(linkTestId: string) {
    return this.page.getByTestId(linkTestId).isVisible();
  }

  async toggleMobileMenu() {
    await this.page.getByTestId('nav-burger').click();
  }
}
