const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db'); // Make sure to adjust the path to your database file

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS BlockOfText (
    id INTEGER PRIMARY KEY,
    idea_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idea_id) REFERENCES Idea(id),
    FOREIGN KEY (author_id) REFERENCES User(id)
)`);
});

db.close(); // Close the database connection

console.log('Karma points field added to Idea table successfully');