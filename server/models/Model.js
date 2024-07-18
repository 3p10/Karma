const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db');

db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS User (
//     id INTEGER PRIMARY KEY,
//     username TEXT NOT NULL UNIQUE, -- Ensure uniqueness
//     email TEXT NOT NULL,
//     karma REAL DEFAULT 1.0 CHECK (karma BETWEEN 0.2 AND 0.5), -- Add karma field as float
//     password TEXT NOT NULL, -- Add password column
//     is_admin BOOLEAN DEFAULT 0 -- 0 for regular user, 1 for admin
// )`);

// db.run(`CREATE TABLE IF NOT EXISTS Idea (
//     id INTEGER PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     title TEXT NOT NULL,
//     description TEXT NOT NULL,
//     header_image_path TEXT NOT NULL, -- Store the path of the header image
//     karma REAL DEFAULT 1.0,
//     FOREIGN KEY (user_id) REFERENCES User(id)
// )`);

// db.run(`CREATE TABLE IF NOT EXISTS IdeaFile (
//     id INTEGER PRIMARY KEY,
//     idea_id INTEGER NOT  NULL,
//     file_name TEXT NOT NULL,
//     file_path TEXT NOT NULL, -- Store the path of the file
//     FOREIGN KEY (idea_id) REFERENCES Idea(id)
// )`);

  
    


  });

module.exports = db;

