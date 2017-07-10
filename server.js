require('dotenv').config();
const express = require('express');
const Raven = require('raven');

const port = process.env.PORT || 3000;

const app = express();

Raven.config(process.env.SENTRY_DNS).install();

app.use(Raven.requestHandler());
app.get('/', () => {
  throw new Error('Broke!');
});
app.use(Raven.errorHandler());

const router = require('./routes/index.js')(app);

router.listen(port);
