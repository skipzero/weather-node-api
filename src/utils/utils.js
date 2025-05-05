import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';

import AmbientWeatherApi from 'ambient-weather-api'

const pollStation = () => {
  const { APP_KEY, API_KEY }  = process.env;

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
            // let count = 0;
        setTimeout(() => {
          pollStation()
        }
        , 1000 * 60 * .5)
        
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


export default { 
  pollStation,
}

pollStation()

// 
// 
// 
// const pagination = (model) => {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
// 
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
// 
//     const results = [];
// 
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit
//       }
//     }
// 
//     if (endIndex < model.length) {
//       results.next = {
//         page: page + 1,
//         limit
//       }
//     }
// 
//     try {
//       results.results = await model.find().limit(limit).skip(startIndex).exec()
//       res.paginateResults = results;
//       next()
//     } catch (err) {
//       console.error(error)
//     }
//   }
// }
// 
// module.exports = pagination;