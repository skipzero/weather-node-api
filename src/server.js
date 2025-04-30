require('dotenv').config()

const express = require('express')
const rateLimit = require('express-rate-limit')

const mongoose = require('mongoose')

const weatherRoutes = require('../routes/weatherRoutes.js')
const userRoutes = require('../routes/userRoutes.js')
const {MONGODB_URL, PORT, DB_NAME} = process.env

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
})

//  
mongoose.connect(`${MONGODB_URL}/${DB_NAME}`)
const db = mongoose.connection

db.on('error', err => console.error(`Error: ${err}`))
db.once('open', () => console.log('db open...'))

app.use(express.json())

const customHeader = (req, res, next) => {
  res.setHeader('X-Powered-By', 'Poe the cat')
  next()
}

app.use(customHeader)

app.use('/weather', limiter, weatherRoutes)
app.use('/user', limiter, userRoutes)

app.listen(PORT, () => console.log('server running...'))