// old version with mongodb
/*
const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/userDB";

mongoose.connect(mongoURI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
	});
*/

// new version with SQLite
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'data.sqlite'), (err) => {
	if (err) {
		console.error('❌ Failed to connect to SQLite DB', err.message);
	} else {
		console.log('✅ Connected to SQLite DB');
	}
});

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		age INTEGER
		)
	`);

db.run(`
		CREATE TABLE IF NOT EXISTS logs (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER,
			action TEXT,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		)
`);

// db.serialize(() => {
// 	db.run('DROP TABLE IF EXISTS logs')
// 	db.run(`
// 		CREATE TABLE IF NOT EXISTS logs (
// 			id INTEGER PRIMARY KEY AUTOINCREMENT,
// 			user_id INTEGER,
// 			action TEXT,
// 			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
// 		)
// 	`);
// });

module.exports = db;
