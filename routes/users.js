// const User = require('../models/User'); // the Mongoose model

// if (fs.existsSync(dataFile)) {
// 	const data = fs.readFileSync(dataFile, 'utf8');
// 	users = JSON.parse(data);
// }

// function saveUsersToFile() {
// 	fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
// }

const db = require('../db');
const logAction = require('../utils');

const getUsers = (req, res) => {
	let sql = 'SELECT * FROM users';
	let params = [];

	if (req.query.name) {
		sql += ' WHERE name LIKE ?';
		params.push(`%${req.query.name}%`);
	}

	db.all(sql, params, (err, rows) => {
		if (err) return res.status(500),json({ error: err.message });
		if (rows.length === 0) return res.status(404).json({ error: `User ${req.query.name} not found` });
		res.json(rows);
	});
};

const addUser = (req, res) => {
	const { name, email, age } = req.body;
	if (!name || name.trim() === '') {
		return res.status(404).json({ error: "Name is required"});
	}

	if (!email || email.trim() === '') {
		return res.status(404).json({ error: "Email is required"});
	}
	const sql2 = ('SELECT * FROM users WHERE (email) = ?', [email]);
	if (sql2) return res.status(404).json({ error: "Email already registered"});
	const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
	db.run(sql, [name, email, age], function (err) {
		if (err) res.status(500).json({ error: err.message });
		logAction(this.lastID, 'Added user');
		res.status(201).json({ 
			message: 'User added successfully',
			user: {
				id: this.lastID,
				name,
				email,
				age
			}
		});
	});
};

const deleteUser = (req, res) => {
	const id = parseInt(req.params.id);

	db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
		if (err) return res.status(500).json({ error: err.message});
		if (!row) return res.status(400).json({ error: `User with id ${req.params.id} not found` });

		db.run("DELETE FROM sqlite_sequence WHERE name='users'");

		db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
			if (err) return res.status(500).json({ error: err.message });
			logAction(row.id, 'Deleted user');
			res.json({ message: `User ${row.id} (${row.name}) successfully deleted`});
		});
	});
};

const updateUser = (req, res) => {
	const id = parseInt(req.params.id);
	const { name } = req.body;

	db.run('UPDATE users SET name = ? WHERE id = ?', [name, id], function (err) {
		if (err) return res.status(500).json({ error: err.message });

		if (this.changes === 0) {
			return res.status(404).json({ error: `User with id ${id} not found` });
		}
		logAction(id, 'Updated user');
		res.json({ message: `User updated with new name ${name}` });
	});
};

const getUserById = (req, res) => {
	const id = parseInt(req.params.id);

	db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!row) return res.status(404).json({ error: `User with id ${id} not found` });
		res.json(row);
	});
};

module.exports = {
	getUsers,
	addUser,
	deleteUser,
	updateUser,
	getUserById,
};