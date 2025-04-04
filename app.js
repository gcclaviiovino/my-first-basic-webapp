const express = require('express');
const app = express();

require('./db');
app.use(express.json());

const routes = require('./routes/routes');
app.use(routes);

app.get('/', (req, res) => {
	res.send("Welcome to liovino's User API!");
})

app.listen(3000, () => {
	console.log('API running on port 3000');
});
