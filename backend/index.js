const express = require('express');
const bodyParser = require('body-parser');
const { parseCopyrights } = require('./parser');
const axios = require('axios');

const app = express();

const PORT = 3030;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	try {
		if (password === '123') {
			res.status(200).json({ email });
		} else {
			res.status(401).json({ error: 'Login error: please use 123 as password' });
		}
	} catch (error) {
		console.error('Login Error: ', error);
		res.status(500).send('Login Error');
	}
});

app.post('/parse-copyright', async (req, res) => {
	const { siteUrl } = req.body;
	try {
		axios.get(siteUrl)
			.then(response => {
				const data = response.data;
				const parsedCopyrights = parseCopyrights(JSON.stringify(data));
				console.log(parsedCopyrights);
				res.status(200).json({ copyrights: parsedCopyrights });
			})
			.catch(error => {
				console.error(error);
			});
	} catch (error) {
		console.error('Error fetching HTML: ', error);
		res.status(500).send('Error fetching HTML');
	}
	console.log(siteUrl);
});

app.listen(PORT, () => {
	console.log('Server on ' + PORT);
});