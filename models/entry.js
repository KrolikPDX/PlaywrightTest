class Entry {
    constructor(title, rank, age) {
        this.title = title;
        this.rank = rank;
        this.age = age;
    }

    //Method to display user details (for debugging purposes)
    getEntry() {
        return {
            title: this.title,
            rank: this.rank,
            age: this.age
        };
    }
}

module.exports = Entry;