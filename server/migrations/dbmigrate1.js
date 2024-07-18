const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db'); // Make sure to adjust the path to your database file

db.serialize(() => {
  db.run('ALTER TABLE User ADD COLUMN header_image_path TEXT ');
});

db.close(); // Close the database connection

console.log('Karma points field added to User table successfully');