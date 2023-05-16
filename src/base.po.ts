import { Page, expect, Locator } from '@playwright/test'

export interface Elements {
    [key: string]: Locator;
}

export class BasePage {
    readonly page: Page;
    readonly element: Elements;

    constructor(page: Page) {
        this.page = page;

        this.element = {
            appTitle: this.page.locator('//h1')
        };
    }

    async waitForAppready(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
        expect(await this.page.title()).toBe('React • TodoMVC')
        await expect(this.element.appTitle).toBeVisible();
    }
}