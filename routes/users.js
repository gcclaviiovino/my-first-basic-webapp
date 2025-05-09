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

const checkEmailExistence = (email) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM users WHERE email = ?';
		db.get(sql, [email], (err, existingUser) => {
			if (err) reject(err);
			if (existingUser) {
				reject('Email already registered');
			}
			resolve();
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
	const { name, email, age } = req.body;

	const fields = [];
	const values = [];

	if (name) {
		fields.push('name = ?');
		values.push(name);
	}
	if (email) {
		fields.push('email = ?');
		values.push(email);
	}
	if (age) {
		fields.push('age = ?');
		values.push(age);
	}

	if (fields.lenght === 0) return res.status(400).json({ error: 'No fields provided to update' });

	values.push(id);

	const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

	db.run(sql, values, function (err) {
		if (err) return res.status(500).json({ error: err.message });
		if (this.changes === 0) {
			return res.status(404).json({ error: `User with id ${id} not found` });
		}
		logAction(id, 'Updated user');
		if (fields.length === 1) {
			const fieldName = fields[0].split('=')[0].trim();
			res.json({ message: `User ${fieldName} updated with new value (${values[0]})` });
		} else {
			res.json({
				message: 'User updated successfully',
				updatedFields: fields.map((f, i) => `${f.split('=')[0].trim()}: ${values[i]}`)
			});
		}
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
	deleteUser,
	updateUser,
	getUserById,
	checkEmailExistence,
};