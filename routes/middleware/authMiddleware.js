const { authenticateToken } = require('./authToken');
const { authorizeAdmin, authorizeSelf } = require('./authRole');

module.exports = { authenticateToken, authorizeAdmin, authorizeSelf };