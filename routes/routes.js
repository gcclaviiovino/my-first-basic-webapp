const express = require('express');
const router = express.Router();
const usersController = require('./users');
const { parrotMake } = require('./parrot');
const logsController = require('./logs');

router.get('/users', usersController.getUsers);
router.post('/users', usersController.addUser);
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersController.updateUser);
router.get('/users/:id', usersController.getUserById);
router.get('/parrot', parrotMake);
router.get('/logs', logsController.getLogs);

module.exports = router;