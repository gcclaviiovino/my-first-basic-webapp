const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const logAction = require('../utils');
const { checkEmailExistence } = require('./users');
const SECRET = 'veryextrematysecret123';

const register = async (req, res) => {
	const { name, email, password, birthDate } = req.body;
	if (!name || !email || !password ) {
		return res.status(400).json({ error: 'Missing one or more required fields' });
	}

	try {
		await checkEmailExistence(email);
	} catch (error) {
		console.error("Email check failed:", error);
		return res.status(409).json({ error: error });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const role = req.body.role || 'user';
		const insertSql = 'INSERT INTO users (name, email, birthDate, password, role) VALUES (?, ?, ?, ?, ?)';
		db.run(insertSql, [name, email, birthDate, hashedPassword, role], function (err) {
			if (err) return res.status(500).json({ error: err.message });

			if (typeof logAction === 'function') logAction(this.lastID, 'User registered')

			res.status(201).json({
			message: 'User added successfully!',
			user: { id: this.lastID, name, email, birthDate }
			});
		});
	} catch (err) {
		res.status(409).json({ error: typeof err === 'string' ? err : 'Registration failed' });
	}
};

const login = (req, res) => {
	const { email, password, } = req.body;
	const query = `SELECT * FROM users WHERE email = ?`;

	db.get(query, [email], async (err, user) => {
		if (!user || !user.password) return res.status(400).json({ error: 'Invalid credentials' });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: 'Wrong password, please try again' });

		const { differenceInYears, parseISO } = require('date-fns');
		let age = null;
		if (user.birthDate) {
			try {
					age = differenceInYears(new Date(), parseISO(user.birthDate));
			} catch (err) {
				console.error('Error parsing birthDate:', err);
			}
		}

		const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, {expiresIn: '2h' });

		res.json({ 
			message: 'Login successful',
			token,
			user: {
			id: user.id,
			name: user.name,
			email: user.email,
			birthDate: user.birthDate,
			age,
			role: user.role
		}});
	});
};

module.exports = { register, login };