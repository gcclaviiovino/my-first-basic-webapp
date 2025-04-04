const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/userDB";

mongoose.connect(mongoURI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
	});
