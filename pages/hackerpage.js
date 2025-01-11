const Entry = require('../models/entry');

exports.HackerPage = class HackerPage {
  constructor(page) {
    this.page = page;
    this.more_button = page.locator('a.morelink');

    // Page element selectors
    this.entryRows = '.submission';
    this.entryTitles = '.titleline'; 
    this.entryRanks = '.rank'; 
    this.entryAges = '.age'; 

    this.all_entries = [];
  }

  async navigate() {
    await this.page.goto('https://news.ycombinator.com/newest');
  }

  async clickMoreButton() {
    await this.more_button.click();
  }

  async getEntriesFromPage() {
    const found_titles = await this.page.$$eval(this.entryTitles, elements => elements.map(el => el.textContent.trim()));
    const found_ranks = await this.page.$$eval(this.entryRanks, elements => elements.map(el => el.textContent.trim()));
    const found_ages = await this.page.$$eval(this.entryAges, elements => elements.map(el => el.getAttribute('title')));
    

    const entries = found_titles.map((title, index) => {
      return new Entry(title, found_ranks[index], found_ages[index]);
    });
  
    this.all_entries = this.all_entries.concat(entries);
}

  async delay(milliseconds) { //Used for headed debugging
    await this.page.waitForTimeout(milliseconds);
  }
};

