const db = require('./db');

function logAction(userId, action) {
	const sql = 'INSERT INTO logs (user_id, action) VALUES (?, ?)';
	db.run(sql, [userId, action], (err) => {
		if (err) {
			console.log(`Failed to  log action: ${action}`);
		}
	});
}

module.exports = logAction;