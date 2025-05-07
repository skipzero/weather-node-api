import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express'
import rateLimit from 'express-rate-limit'

import mongoose from 'mongoose'

import weatherRoutes from './routes/weatherRoutes.js'
import userRoutes from './routes/userRoutes.js'
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

app.get('/', limiter, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.use('/weather', limiter, weatherRoutes)
app.use('/user', limiter, userRoutes)

app.listen(PORT, () => console.log('server running...'))