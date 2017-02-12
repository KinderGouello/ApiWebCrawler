const express = require('express')
const app = express()
const router = require('./routes/index.js')(app)

router.listen(3000)
