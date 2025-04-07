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
  const {
    winddir,
    windspeedmph,
    windgustmph,
    maxdailygust,
    lastRain,
    eventrainin,
    hourlyrainin,
    weeklyrainin,
    monthlyrainin,
    totalrainin,
    tempf,
    humidity,
    baromabsin,
    baromrelin,
    feelsLike,
    dewpoint,
    solarradiation,
    uv,

  } = req.body
  const weather = new Weather({
    date: new Date(),
    wind: {
      windDir: winddir,
      windSpeed: windspeedmph,
      windGust: windgustmph,
      maxDailyGust: maxdailygust
    },
    rain: {
      lastRain,
      eventRain: eventrainin,
      hourlyRain: hourlyrainin,
      weeklyRain: weeklyrainin,
      monthlyRain: monthlyrainin,
      totalRain: totalrainin,
    },
    temp: {
      tempf,
      feelsLike: feelsLike,
      dewPoint: dewpoint,
    },
    humBar: {
      humidity,
      baromAbs: baromabsin,
      baromRel: baromrelin,

    },
    uvSolar: {
      uvIndex: uv,
      solarRad: solarradiation,
    }
  })

  try {
    const newWeather = await weather.save()
    await console.log('*******', newWeather)
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