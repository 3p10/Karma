const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db'); // Make sure to adjust the path to your database file

db.serialize(() => {
  db.run('ALTER TABLE Idea ADD COLUMN Lkarma REAL DEFAULT -1.0 ');
});

db.close(); // Close the database connection

console.log('Karma points field added to Idea table successfully');