import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';

import AmbientWeatherApi from 'ambient-weather-api'
const { APP_KEY, API_KEY, SECRET }  = process.env;

const pollStation = () => {

  const api = new AmbientWeatherApi({
    apiKey: API_KEY,
    applicationKey: APP_KEY
  })

  // list the user's devices
  api.userDevices()
    .then((devices) => {

      devices.forEach((device) => {
      // fetch the most recent data
      api.deviceData(device.macAddress, {
        limit: 1
      })
      .then((deviceData) => {
        setTimeout(() => {
          pollStation()
        }
        , 1000 * 60 * 5)
        
        deviceData.forEach((data) => {
          const date = new Date() 
          data.date = date

          console.log('*****', data.date, '******')
          try {
            axios.post('http://localhost:3000/weather', data)
          } catch (err) {
            console.error(err)
          }
        })
      })
    })
  })
}

export const random = () => crypto.randomBytes(128).toString('base64').replace(/=/g, '')
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join()).update(SECRET!).digest('hex')
}


export default { 
  pollStation,
}

pollStation()