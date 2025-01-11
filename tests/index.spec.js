const { test, expect } = require('@playwright/test');
const { HackerPage } = require('../pages/hackerpage');

test('first 100 articles are sorted from newest to oldest', async ({ page }) => {
  const hackerPage = new HackerPage(page);
  await hackerPage.navigate();
  await hackerPage.delay(1000);
  while (hackerPage.all_entries.length < 100) {
    await hackerPage.getEntriesFromPage();
    await hackerPage.clickMoreButton();
  }
  //console.log(hackerPage.all_entries.map(entry => entry.getEntry())); //Print all entries
  await hackerPage.delay(1000);

});
