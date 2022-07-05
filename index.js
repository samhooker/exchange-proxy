import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import exchangeValidator from './components/exchangeValidator.js';

const app = express();

app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/', (req, res) => {
	res.send('Please visit a valid API endpoint.');
});

app.get('/exchange/:endpoint/:currency?', async (req, res) => {
	let apiUrl = exchangeValidator('https://fxdata.foorilla.com/api/' + req.params.endpoint, req.params, req.query);

	if (apiUrl) {
		const response = await fetch(apiUrl);
		const data = await response.json();
	
		res.send(data);
	}
	else {
		res.status(400).send('Please correct your URL format and try again.');
	}
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
})