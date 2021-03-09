const path = require('path')

const PORT = process.env.PORT || 5000

const staticDir = path.resolve(__dirname, 'static')

module.exports = {PORT, staticDir}