const db = require("../db");

const getLogs = (req, res) => {
	const sql = `
		SELECT logs.id, logs.user_id, users.name, logs.action, logs.timestamp
		FROM logs
		LEFT JOIN users ON logs.user_id = users.id
		ORDER BY logs.timestamp DESC
	`;

	db.all(sql, [], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
}

module.exports = { getLogs };