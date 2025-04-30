const axios = require('axios')
require('dotenv').config()
const AmbientWeatherApi = require('ambient-weather-api')
const {APP_KEY, API_KEY} = process.env
const apiKey = API_KEY;
const applicationKey = APP_KEY;

console.log(APP_KEY, API_KEY)

// helper function
function getName (device) {
  return device.info.name
}

// API call to add document to mongoDB
const postData = async d => {

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
  } = d

  const body = {

    // address,
    
      "winddir": winddir,
      "windspeedmph": windspeedmph,
      "windgustmph": windgustmph,
      "maxdailygust":maxdailygust,
      "lastRain": lastRain,
      "eventrainin": eventrainin,
      "hourlyrainin": hourlyrainin,
      "dailyrainin": dailyrainin,
      "weeklyrainin": weeklyrainin,
      "monthlyrainin": monthlyrainin,
      "totalrainin": totalrainin,
      "tempf": tempf,
      "feelsLike": feelsLike,
      "dewPoint": dewPoint,
      "humidity": humidity,
      "baromabsin": baromabsin,
      "baromrelin": baromrelin,
      "uv": uv,
      "solarradiation": solarradiation
    
    
  }
  const settings = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }

  try {
    axios.post('http://localhost:3000/weather', body)
      .then(resp => console.log('*******',body, '********'))
      .catch(err => console.error(err))
  } catch (err) {
    console.error(`Server error: ${err.message}`)
    return err;
  }
}

// creates a new instance of the AmbientWeatherApi class 
const api = new AmbientWeatherApi({
  apiKey,
  applicationKey
})

api.connect()
api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'))

api.on('subscribed', data => {
  console.log('Subscribed to ' + data.devices.length + ' device(s): ')
  console.log(data.devices.map(getName).join(', '))
})
api.on('data', async data => {
  console.log('======================', data, '=======================')
  const newDate = new Date(data.date).toISOString()
  await postData(data)
  console.log(data.date + ' - ' + getName(data.device) + ' current outdoor temperature is: ' + data.tempf + '°F',  typeof newDate, newDate)
})
api.subscribe(apiKey)