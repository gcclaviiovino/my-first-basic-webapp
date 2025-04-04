const express = require('express');
const router = express.Router();
const usersController = require('./users');

router.get('/users', usersController.getUsers);
router.post('/users', usersController.addUser);
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersController.updateUser);
router.get('/users/:id', usersController.getUserById);

module.exports = router;