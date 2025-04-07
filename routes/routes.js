const express = require('express');
const router = express.Router();
const usersController = require('./users');
const { parrotMake } = require('./parrot');
const logsController = require('./logs');
const authController = require('./auth');

// USERS
router.get('/users', usersController.getUsers);
router.post('/users', usersController.addUser);
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersController.updateUser);
router.get('/users/:id', usersController.getUserById);

// PARROT
router.get('/parrot', parrotMake);

// LOGS
router.get('/logs', logsController.getLogs);

//AUTH
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;