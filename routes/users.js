const User = require('../models/User'); // the Mongoose model

// if (fs.existsSync(dataFile)) {
// 	const data = fs.readFileSync(dataFile, 'utf8');
// 	users = JSON.parse(data);
// }

// function saveUsersToFile() {
// 	fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
// }

const getUsers = async (req, res) => {
	try {
		let query = {};
		if (req.query.name) {
			query.name = { $regex: req.query.name, $options: 'i' };
		}

		const result = await User.find(query);
		if (result.length === 0) {
			return res.status(404).json({ error: `User ${req.query.name} not found` });
		}	
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const addUser = async (req, res) => {
	try {
		if (!req.body.name || req.body.name.trim() === "") {
			return res.status(404).json({ error: "Name is required"});
		}
		const newUser = new User({ name: req.body.name });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user =  await User.findByIdAndDelete(req.params.id);	
		if (!user) {
			return res.status(404).json({ error: `User with id ${req.params.id} not found` });
		}
		res.json({ message: `User ${user._id} (${user.name}) successfully deleted` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, {
			name: req.body.name
		}, { new: true });
	
		if (!user) return res.status(404).json({ error: `User with id ${req.params.id} not found` });
		res.json({ message: `User updated with new name ${user.name}` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ error: `User with id ${req.params.id} not found`});
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getUsers,
	addUser,
	deleteUser,
	updateUser,
	getUserById,
};