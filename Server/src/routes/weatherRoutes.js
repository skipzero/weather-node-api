import  express from 'express'
const weatherRoutes = express.Router()
import { ObjectId } from 'mongodb'

import Weather from '../models/weather.js'

//import paginate from '../utils/utils.js'

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
weatherRoutes.post('/', async (req, res) => {

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
weatherRoutes.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const weather = await Weather.findById(id)
    if (!weather) {
      return res.status(404).json({ message: 'Record not found' })
    }
    const { 
      address, 
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
    } = req.body
    weather.address = address
    weather.wind.winddir = winddir
    weather.wind.windspeedmph = windspeedmph
    weather.wind.windgustmph = windgustmph
    weather.wind.maxdailygust = maxdailygust
    weather.rain.lastrain = lastRain
    weather.rain.eventrainin = eventrainin
    weather.rain.hourlyrainin = hourlyrainin
    weather.rain.dailyrainin = dailyrainin
    weather.rain.weeklyrainin = weeklyrainin
    weather.rain.monthlyrainin = monthlyrainin
    weather.rain.totalrainin = totalrainin
    weather.temp.tempf = tempf
    weather.temp.feelsLike = feelsLike
    weather.temp.dewPoint = dewPoint
    weather.humBar.humidity = humidity
    weather.humBar.baromabsin = baromabsin
    weather.humBar.baromrelin = baromrelin
    weather.uvSolar.uv = uv
    weather.uvSolar.solarradiation = solarradiation
    weather.date = date

    const updatedWeather = await weather.save()
    res.json(updatedWeather)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// delete one
weatherRoutes.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const weather = Weather.findByIdAndDelete(id)
    if (!weather) {
      return res.status(404).json({ message: 'Record not found' })
    }
    res.json({ message: 'Weather deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

})

export default weatherRoutes