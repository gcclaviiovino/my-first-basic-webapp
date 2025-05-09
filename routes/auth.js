const { checkEmailExistence } = require('./users');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const logAction = require('../utils');
const SECRET = 'supersecret123';

const register = async (req, res) => {
	const { name, email, password, age } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ error: 'Missing one or more required fields' });
	}

	try {
		await checkEmailExistence(email);  // Check if email already exists
	} catch (error) {
		console.error("Email check failed:", error);
		return res.status(409).json({ error: error });  // Handle "Email already registered" error
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const insertSql = 'INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)';
		db.run(insertSql, [name, email, age, hashedPassword], function (err) {
			if (err) return res.status(500).json({ error: err.message });

			if (typeof logAction === 'function') logAction(this.lastID, 'User registered')

			res.status(201).json({
			message: 'User added successfully!',
			user: { id: this.lastID, name, email, age }
			});
		});
	} catch (err) {
		res.status(409).json({ error: typeof err === 'string' ? err : 'Registration failed' });
	}
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