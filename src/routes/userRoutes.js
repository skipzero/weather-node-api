import express from 'express'
const userRoutes = express.Router()
import { ObjectId } from 'mongodb'

import * as User from '../models/users.js'
// get all
userRoutes.get('/', async (req, res) => {
  try {
    const allUser = await User.find()
    res.json(allUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get one
userRoutes.get('/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const oneUser = await User.findOne({ email })
    // const oneUser = await User.findOne({ _id: id })
    res.json(oneUser)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
  
})

// create one
userRoutes.post('/',async  (req, res) => {
  const {name, email, userName} = req.body
  const user = new User({
    name,
    email,
    userName,
  })

  try {
    const newUser = await user.save()
    await console.log('*******', newUser)
    res.status(201).json(newUser)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// updating one
userRoutes.patch('/:id', (req, res) => {

})


// delete one
userRoutes.get('/:id', (req, res) => {

})

export default  userRoutes