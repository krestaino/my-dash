const axios = require('axios');
const express = require('express');
const cors = require('cors');

const authenticate = require('./auth.js');
const PORT = process.env.API_PORT;
const app = express();

app.use(cors({ origin: process.env.UI_ORIGIN }));

require('./routes.js')(app, authenticate, axios);

app.listen(PORT, () => console.log('API: Accepting connections at http://localhost:' + PORT));
