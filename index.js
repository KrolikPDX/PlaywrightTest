// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { test, expect } = require('@playwright/test');
const { ArticlePage } = require('./pages/articlepage');

async function sortHackerNewsArticles(d) {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const articlePage = new ArticlePage(page);
  await articlePage.navigate();
  while (articlePage.all_entries.length <= 100) { //Keep clicking more and grabbing entries until we have at least 100
    await articlePage.getEntriesFromPage();
    await articlePage.clickMoreButton();
  }
  await articlePage.trimEntriesTo(100); //Trim entries to be only first 100 

  const expectedSortOrder = "Descending";
  expect(await articlePage.allEntriesSortedByDate(expectedSortOrder), `Not all entry dates were sorted by '${expectedSortOrder}'`).toBe(true); 
  await page.close();
  await context.close();
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
