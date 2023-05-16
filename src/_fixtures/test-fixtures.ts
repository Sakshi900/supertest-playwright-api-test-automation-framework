// import { test as base, expect } from '@playwright/test'

// import { BasePage } from '../base.po';
// import { TodoPage } from '../Todo/todo.po';


// export const test = base.extend<
//     {
//         base?: BasePage;
//         todoPage: TodoPage;
//     },
//     WorkerOptions
// >({
//     base: async ({ page }, use) => {
//         await page.goto('', { waitUntil: 'domcontentloaded' });
//         await use(new BasePage(page));
//     },
//     todoPage: async ({ page }, use) => {
//         await page.goto('', { waitUntil: 'domcontentloaded' });
//         await use(new TodoPage(page));
//     },

// });

// export { expect } from '@playwright/test'