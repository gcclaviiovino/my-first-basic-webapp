const express = require('express');
const app = express();
// const cors = require('cors');

require('./db');
app.use(express.json());

const routes = require('./routes/routes');
app.use(routes);

app.get('/', (req, res) => {
	res.send("Welcome to liovino's little server!");
})

app.listen(3000, () => {
	console.log('Server running on port 3000');
});

// app.use(cors({
// 	origin: 'http://127.0.0.1:5173/',
// 	credentials: true
// }))
