const express = require('express')
const weatherRoutes = express.Router()
const Weather = require('../models/weather')

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
weatherRoutes.get('/:id', (req, res) => {
  res.send(req.params.id)
})

// create one
weatherRoutes.post('/',async  (req, res) => {
  
  const address = 'Warfield, Oakland, Lake Merritt'
  const date = new Date();

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

module.exports = weatherRoutes