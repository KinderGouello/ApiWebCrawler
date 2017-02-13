const port = process.env.PORT || 3000;
const express = require('express')
const app = express()
const router = require('./routes/index.js')(app)

router.listen(port)
