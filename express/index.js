const express = require('express')
const path = require('path')
const config = require('./config')
const users = require('./Users')
const moment = require('moment')
const router = require('./routes/api/users')

const app = express()

const logger = (req, res, next) => {
    console.log(`${moment().format()}: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
}

// app.use(logger)
app.use('/api/users', router)
app.use(express.static(config.staticDir))


app.listen(config.PORT, () => {
    console.log(`The server is running on PORT ${config.PORT}...`)
})