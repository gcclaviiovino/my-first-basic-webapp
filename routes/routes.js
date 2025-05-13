const express = require('express');
const router = express.Router();
const usersController = require('./users');
const { parrotMake } = require('./parrot');
const logsController = require('./logs');
const authController = require('./auth');
const quotes = require('./quote');
const midController = require('./middleware/authMiddleware');

// PROFILE
router.get('/profile', midController.authenticateToken, (req, res) => {
	res.json({ message: `Welcome ${req.user.name}` });
});
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// USER ACTIONS
router.get('/users', midController.authenticateToken, midController.authorizeAdmin, usersController.getUsers);
router.delete('/users/:id', midController.authenticateToken, midController.authorizeSelf, usersController.deleteUser);
router.put('/users/:id', midController.authenticateToken, midController.authorizeSelf, usersController.updateUser);
router.get('/users/:id', midController.authenticateToken, midController.authorizeAdmin, usersController.getUserById);

// PARROT
router.get('/parrot', parrotMake);

// LOGS
router.get('/logs', midController.authenticateToken, midController.authorizeAdmin, logsController.getLogs);

// QUOTES
router.get('/quote/zen', quotes.getZenQuote);
router.get('/quote/fortune', quotes.getFortuneQuote);

module.exports = router;