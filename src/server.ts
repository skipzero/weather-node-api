import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'

import rateLimit from 'express-rate-limit'

import weatherRoutes from './routes/weatherRoutes.js'
import userRoutes from './routes/userRoutes.ts'

const {MONGODB_URL, PORT, DB_NAME} = process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
})

//  
mongoose.connect(`${MONGODB_URL}/${DB_NAME}`)
const db = mongoose.connection

const customHeader = (req, res, next) => {
  res.setHeader('X-Powered-By', 'Poe the cat')
  next()
}

db.on('error', err => console.error(`Error: ${err}`))
db.once('open', () => console.log('db open...'))

app.use(customHeader)
app.use(morgan('dev'))
app.use(cors({
  credentials: true,
}))
app.use(compression())
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json())

app.get('/', limiter, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.use('/weather', limiter, weatherRoutes)
app.use('/user', limiter, userRoutes)

app.listen(PORT, () => console.log(`server running...port: ${PORT}`))