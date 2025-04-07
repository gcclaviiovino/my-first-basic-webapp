const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = 'supersecret123';

const register = (req, res) => {
	const { name, email, password, age } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ error: 'Missing one or more required fields' });
	}

	bcrypt.hash(password, 10, (err, hashedPassword) => {
		if (err) return res.status(500).json({ error: 'Error hashing password' });

		const sql = 'INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)';
		db.run(sql, [name, email, age, hashedPassword], function (err) {
			if (err) return res.status(500).json({ error: err.message });
			res.status(201).json({
				message: 'User added successfully!',
				user: { id: this.lastID, name, email, age }
			});
		});
	});
};

const login = (req, res) => {
	const { email, password } = req.body;
	const query = `SELECT * FROM users WHERE email = ?`;
	db.get(query, [email], async (err, user) => {
		if (!user || !user.password) return res.status(400).json({ error: 'Invalid credentials' });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: 'Wrong password, please try again'});
		const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '2h' }) // time of expiration to be changed
		res.json({ message: 'Login successful', token});
	});
};

module.exports = { register, login };