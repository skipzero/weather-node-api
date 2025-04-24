const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
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

module.exports = mongoose.model('weather', weatherSchema, 'weather')