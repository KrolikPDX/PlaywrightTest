const Entry = require('../models/entry');

exports.ArticlePage = class ArticlePage {
  constructor(page) {
    this.page = page;

    //Page element selectors
    this.moreButton = 'a.morelink';
    this.entryTitles = '.titleline'; 
    this.entryRanks = '.rank'; 
    this.entryAges = '.age'; 

    //Page object models
    this.all_entries = []; //[Entry]
  }

  async navigate() {
    await this.page.goto('https://news.ycombinator.com/newest');
  }

  async clickMoreButton() {
    await this.page.locator(this.moreButton).click();
  }

  async getEntriesFromPage() { //Get all entries for this page, add them to all_entries
    const found_titles = await this.page.$$eval(this.entryTitles, elements => elements.map(el => el.textContent.trim()));
    const found_ranks = await this.page.$$eval(this.entryRanks, elements => elements.map(el => el.textContent.trim()));
    const found_ages = await this.page.$$eval(this.entryAges, elements => elements.map(el => new Date(el.getAttribute('title').split(" ")[0])));
    
    //Setup [Entry] given arrays of found_titles, found_ranks, and found_ages
    const entries = found_titles.map((title, index) => { return new Entry(title, found_ranks[index], found_ages[index])});
    
    this.all_entries = this.all_entries.concat(entries); //Add current page entries to list of all_entries
  }

  async trimEntriesTo(count) { //Trims all_entries to be 0 -> count 
    this.all_entries = this.all_entries.slice(0, count);
  }

  async allEntriesSortedByDate(order = "Descending") {
    const allAges = this.all_entries.map(x => x.age);
    order == "Ascending" ? allAges.sort((a, b) => a - b) : allAges.sort((a, b) => b - a); //Sorts allAges to either (Ascending = a-b) or (Descending = b-a)
    return JSON.stringify(this.all_entries.map(x => x.age)) ==  JSON.stringify(allAges); //Returns true if original sequence matches sorted sequence
  }

  async delay(milliseconds) { //Used for headed debugging
    await this.page.waitForTimeout(milliseconds);
  }
};

