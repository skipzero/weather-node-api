import  express from 'express'
const weatherRoutes = express.Router()
import { ObjectId } from 'mongodb'

import Weather from '../models/weather.cjs'

import paginate from '../utils/utils.js'

import pkg from 'express-validator';
const {check, expressValidationResults} = pkg;

// get all
weatherRoutes.get('/', async (req, res) => {
  try {
    const allWeather = await Weather.find()
    res.json(allWeather)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get one
weatherRoutes.get('/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const oneWeather = await Weather.findOne({ _id: id })
    res.json(oneWeather)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
  
})

// create one
weatherRoutes.post('/',async  (req, res) => {
  
  const address = 'Warfield, Oakland, Lake Merritt'

  const {
    winddir,
    windspeedmph,
    windgustmph,
    maxdailygust,
    lastRain,
    eventrainin,
    hourlyrainin,
    dailyrainin,
    weeklyrainin,
    monthlyrainin,
    totalrainin,
    tempf,
    humidity,
    baromabsin,
    baromrelin,
    feelsLike,
    dewPoint,
    solarradiation,
    uv,
    date
  } = req.body;


  const lastrain = new Date(lastRain)
  
  const weather = new Weather({
    
    address,
    wind: {
      winddir,
      windspeedmph,
      windgustmph,
      maxdailygust
    },
    rain: {
      lastrain,
      eventrainin,
      hourlyrainin,
      dailyrainin,
      weeklyrainin,
      monthlyrainin,
      totalrainin,
    },
    temp: {
      tempf,
      feelsLike,
      dewPoint,
    },
    humBar: {
      humidity,
      baromabsin,
      baromrelin,
    },
    uvSolar: {
      uv,
      solarradiation,
    },
    date,
  })

  try {
    const newWeather = await weather.save()
    res.status(201).json(newWeather)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// updating one
weatherRoutes.patch('/:id', (req, res) => {

})


// delete one
weatherRoutes.get('/:id', (req, res) => {

})

export default weatherRoutes