require('dotenv').config()

const express = require('express')
const rateLimit = require('express-rate-limit')

const mongoose = require('mongoose')
const  User = require('./models/users.js')

const weatherRoutes = require('./routes/weatherRoutes')
const userRoutes = require('./routes/userRoutes')
const {MONGODB_URL, PORT, DB_NAME, API_KEY} = process.env

const app = express()


// 
mongoose.connect(`${MONGODB_URL}/${DB_NAME}`)
const db = mongoose.connection

db.on('error', err => console.error(`Error: ${err}`))
db.once('open', () => console.log('db open...'))

const dbName = 'pagination'

app.use(express.json())

const customHeader = (req, res, next) => {
  res.setHeader('X-Powered-By', 'Poe the cat')
  next()
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
})

app.use(customHeader)

app.use('/weather', limiter, weatherRoutes)
app.use('/user', limiter, userRoutes)

app.get('/users', limiter, paginatedResults(User), (req, res) => {

  res.json(res)
})

function paginatedResults(model) {
  console.log('-----', model)
  return async (req,res,next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
  
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
  
    const results = {}

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      }  
    }
    
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit
      }
    }
    
    try {
      console.log('MODEL=======',results)
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (error) {
      console.error(error)
    }

  }
}
  

app.listen(PORT, () => console.log('server running...'))