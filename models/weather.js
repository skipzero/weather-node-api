const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  date: {
    type: Date,
    index: true,
    trim: true,
    // required: true,
  },
  wind: {
    windDir: {
      type: Number,
      trim: true,
      // required: true
    },
    windSpeed: {
      type: Number,
      trim: true,
      // required: true,
    },
    windGust: {
      type: Number,
      trim: true,
      // required: true,
    },
    maxDailyGust: {
      type: Number,
      trim: true,
      // required: true
    }
  },
  rain: {
    lastRain: {
      type: Date,
      rquired: true
    },
    eventRain: {
      type: Number,
      trim: true,
      // required: true
    },
    hourlyRain: {
      type: Number,
      trim: true,
      // required: true
    },
    dailyRain: {
      type: Number,
      trim: true,
      // required: true
    },
    weeklyRain: {
      type: Number,
      trim: true,
      // required: true,
    },
    monthlyRain: {
      type: Number,
      trim: true,
      // required: true,
    },
    totalRain: {
      type: Number,
      trim: true,
      // required: true,
    }
  },
  temp: {
    outTemp: {
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
    baromAbs: {
      type: Number,
      trim: true,
      // required: true,
    },
    baromRel: {
      type: Number,
      trim: true,
      // required: true,
    }
    
  },
  uvSolar: {
    uvIndex: {
      type: Number,
      trim: true,
      // required: true,
    },
    solarRad: {
      type: Number,
      trim: true,
      // required: true,
    }
  }
})

module.exports = mongoose.model('weather', weatherSchema, 'weather')