require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');

const app = express();
const Raven = require('raven');

Raven.config(process.env.SENTRY_DNS).install();

app.use(Raven.requestHandler());
app.get('/', function mainHandler(req, res) {
    throw new Error('Broke!');
});
app.use(Raven.errorHandler());

const router = require('./routes/index.js')(app);

router.listen(port);
