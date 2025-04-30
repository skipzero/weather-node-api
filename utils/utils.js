require('dotenv').config()

const { APP_KEY, API_KEY }  = process.env;
const AmbientWeatherApi = require('ambient-weather-api')

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
      limit: 5
    })
    .then((deviceData) => {
      console.log('The 5 most recent temperature reports for ' + device.info.name + ' - ' + device.info.location + ':')
      deviceData.forEach((data) => {
        console.log(data)
        console.log('*****')
        console.log(data.date + ' - ' + data.tempf + '°F')
      })
      console.log('---')
    })
  })
})

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