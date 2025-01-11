const { chromium } = require("playwright");
const { expect } = require('@playwright/test');
const { ArticlePage } = require('./pages/articlepage');

async function sortHackerNewsArticles() {
  //Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const articlePage = new ArticlePage(page);
  await articlePage.navigate();

  //Get all entries until we have at least 100
  while (articlePage.all_entries.length <= 100) {
    await articlePage.getEntriesFromPage();
    await articlePage.clickMoreButton();
  }
  await articlePage.trimEntriesTo(100); //Trim entries to be only first 100 

  //Validate date order
  const expectedSortOrder = "Descending";
  expect(await articlePage.allEntriesSortedByDate(expectedSortOrder), `Not all entry dates were sorted by '${expectedSortOrder}'`).toBe(true); 
  
  //Close browser
  await page.close();
  await context.close();
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
