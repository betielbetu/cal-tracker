const express = require('express');

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

app.get('*', (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		res.sendFile(path.join(__dirname, '../../client/build/index.html'));
	}else{
		res.sendFile(path.join(__dirname, '../../client/public/index.html'));
	}
});

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		// log where we can go to test our GQL API
	});
});

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});
