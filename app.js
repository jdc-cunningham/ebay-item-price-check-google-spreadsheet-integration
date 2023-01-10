const express = require('express');
const bodyParser = require('body-parser');
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const port = 5000;

// CORs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  console.log(req);
  res.status(200).send('online');
});

app.listen(port, () => {
  console.log(`App running... on port ${port}`);
});

const ebayAuthToken = new EbayAuthToken({
	clientId: process.env.SANDBOX_CLIENT_ID,
	clientSecret: process.env.SANDBOX_CLIENT_SECRET,
	redirectUri: 'http://localhost:5000',
});

(async () => {
	const token = await ebayAuthToken.getApplicationToken('SANDBOX');
	console.log(token);
})();

