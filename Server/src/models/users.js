import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  // password to go here...
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
    profile: {
      address: {
      type: String,
      trim: true,
      required: false,
    },
    phone: {
      type: Number,
      trim: true,
      required: false,
    },
  },
  signup_date: {
    type: Date,
    trim: true,
    required: true,
    default: Date.now
  }
})

export default mongoose.model('user', userSchema, 'user')