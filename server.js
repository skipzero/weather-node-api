import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const {MONGODB_URL, PORT} = process.env

const app = express()

import mongoose from "mongoose"
import User from './models/users.js'

import weatherRoutes from './routes/weatherRoutes.js'

// 
mongoose.connect(MONGODB_URL)
const db = mongoose.connection

db.on('error', err => console.error(`Error: ${err}`))
db.once('open', () => console.log('db open...'))

const dbName = 'pagination'

app.use(express.json())

app.use('/weather', weatherRoutes)

app.get('/users', paginatedResults(User), (req, res) => {

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