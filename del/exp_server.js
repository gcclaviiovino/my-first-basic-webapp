
/*
// use express to host and manage the server
const express = require('express');
const app = express();
app.use(express.json());

// adding some default users
let users = [{ id: 1, name: 'Luminata'}, {id: 2, name: 'Veronica'}];

// default welcome message
app.get('/', (req, res) => {
	res.send('Welcome to the User API! Available routes: /users');
})

// to add a new user
app.post('/users', (req, res) => {
	const newUser = { id: users.length + 1, ...req.body };
	if (!req.body.name || req.body.name.trim() === "") {
		return res.status(404).json({ error: "Name is required"});
	}
	users.push(newUser);
	res.status(201).json(newUser);
});

// to delete a user
app.delete('/users/:id', (req, res) => {
	const userId =  parseInt(req.params.id)
	const userIndex = users.findIndex(user => user.id === userId);

	if (userIndex === -1) {
		return res.status(404).json({ error: `User ${userId} not found` });
	}

	users.splice(userIndex, 1);
	res.json({ message: `User ${userId} successfully deleted` });
});

// to change user name through id
app.put('/users/:id', (req, res) => {
	const userId = parseInt(req.params.id);
	const user = users.find(u => u.id === userId);

	if (!user) return res.status(404).json({ error: `User ${userId} not found` });

	user.name = req.body.name || user.name;
	res.json({ message: `User updated with new name ${user.name}` });
});

// to find user through id
app.get('/users/:id', (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({ error: "User not found"});
	res.json(user);
});

// to search for user through user name
app.get('/users', (req, res) => {
	let result = [...users];

	if (req.query.name) {
		console.log(`Filtering for: ${req.query.name}`);
		result = result.filter(u => u.name.toLowerCase().includes(req.query.name.toLowerCase()));
	}

	res.json(result);
});

// server listening loop
app.listen(3000, () => console.log('API running on port 3000'));
*/