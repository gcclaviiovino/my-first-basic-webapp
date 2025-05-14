const jwt = require('jsonwebtoken');
const SECRET = 'veryextrematysecret123'; // one day to be migrate into a .env

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1];

	if(!token) {
		return res.status(401).json({ error: 'Access denied: no token provided' });
	}

	jwt.verify(token, SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: 'Invalid Token '});

		req.user = user;
		next();
	})
}

module.exports = { authenticateToken };