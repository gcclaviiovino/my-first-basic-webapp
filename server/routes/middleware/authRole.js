const jwt = require('jsonwebtoken');
const SECRET = 'veryextrematysecret123';

const authorizeAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		return res.status(403).json({ error: 'Access denied: Admins only' })
	}
}

const authorizeSelf = (req, res, next) => {
	const userIdFromToken = req.user.id;
	const userIdFromParams = parseInt(req.params.id);

	if (userIdFromToken === userIdFromParams) {
		return next();
	} else {
		return res.status(403).json({ error: 'Access denied: User is unauthorised '});
	}
}

module.exports = { authorizeAdmin, authorizeSelf };