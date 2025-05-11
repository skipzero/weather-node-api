import { Schema, Model, Document, connect } from 'mongoose'

interface IWeather {
  address: string,
  wind: {
    winddir: number,
    windspeedmph: number,
    windgustmph: number,
    maxdailygust: number
  },
  rain: {
    lastrain: Date,
    eventrainin: number,
    hourlyrainin: number,
    dailyrainin: number,
    weeklyrainin: number,
    monthlyrainin: number,
    totalrainin: number
  },
  temp: {
    tempf: number,
    feelsLike: number,
    dewPoint: number
  },
  humBar: {
    humidity: number,
    baromabsin: number,
    baromrelin: number
  },
  uvSolar: {
    uv: number,
    solarradiation: number
  },
  date: Date
}

const weatherSchema = new Schema({
  address: {
    type: String,
    trim: true,
    required: false
  },

  wind: {
    winddir: {
      type: Number,
      trim: true,
      // required: true
    },
    windspeedmph: {
      type: Number,
      trim: true,
      // required: true,
    },
    windgustmph: {
      type: Number,
      trim: true,
      // required: true,
    },
    maxdailygust: {
      type: Number,
      trim: true,
      // required: true
    }
  },
  rain: {
    lastrain: {
      type: Date,
      rquired: true
    },
    eventrainin: {
      type: Number,
      trim: true,
      // required: true
    },
    hourlyrainin: {
      type: Number,
      trim: true,
      // required: true
    },
    dailyrainin: {
      type: Number,
      trim: true,
      // required: true
    },
    weeklyrainin: {
      type: Number,
      trim: true,
      // required: true,
    },
    monthlyrainin: {
      type: Number,
      trim: true,
      // required: true,
    },
    totalrainin: {
      type: Number,
      trim: true,
      // required: true,
    }
  },
  temp: {
    tempf: {
      type: Number,
      trim: true,
      // required: true,
    },
    feelsLike: {
      type: Number,
      trim: true,
      // required: true,
    },
    dewPoint: {
      type: Number,
      trim: true,
      // required: true,
    }
  },
  humBar: {
    humidity: {
      type: Number,
      trim: true,
      // required: true,
    },
    baromabsin: {
      type: Number,
      trim: true,
      // required: true,
    },
    baromrelin: {
      type: Number,
      trim: true,
      // required: true,
    }
    
  },
  uvSolar: {
    uv: {
      type: Number,
      trim: true,
      // required: true,
    },
    solarradiation: {
      type: Number,
      trim: true,
      // required: true,
    }
  },
  date: {
    type: Date,
    index: true,
    trim: true,
    // required: true,
  },
})

interface IWeatherDocument extends IWeather, Document {}
interface IWeatherModel extends Model<IWeatherDocument> {}

const WeatherModel: IWeatherModel = Model.weather || Model<IWeatherDocument>('weather', weatherSchema, 'weather')




// const weather = model<IWeather>('weather', weatherSchema, 'weather')

// run().catch(err => console.log(err))
// 
// async function run() {
//   await connect('mongodb://localhost:27017/weather')
//   console.log('Connected to MongoDB')
// 
//   const weather = new weather({})
//   await weather.save()
// }