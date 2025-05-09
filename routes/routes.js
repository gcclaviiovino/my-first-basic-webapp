const express = require('express');
const router = express.Router();
const usersController = require('./users');
const { parrotMake } = require('./parrot');
const logsController = require('./logs');
const authController = require('./auth');
const quotes = require('./quote');

// USER ACTIONS
router.get('/auth/register', (req, res) => {
	res.send('Send a POST request to register a user');
});
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/users', usersController.getUsers);
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersController.updateUser);
router.get('/users/:id', usersController.getUserById);

// PARROT
router.get('/parrot', parrotMake);

// LOGS
router.get('/logs', logsController.getLogs);

// QUOTES
router.get('/quote/zen', quotes.getZenQuote);
router.get('/quote/fortune', quotes.getFortuneQuote);

module.exports = router;