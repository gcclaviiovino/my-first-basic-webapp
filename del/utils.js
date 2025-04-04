const fs = require('fs');

function saveUsersToFile(data, filePath) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { savetoFile };