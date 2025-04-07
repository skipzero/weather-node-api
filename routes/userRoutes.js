const express = require('express')
const userRoutes = express.Router()
const User = require('../models/users')

// get all
userRoutes.get('/', async (req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get one
userRoutes.get('/:id', (req, res) => {
  res.send(req.params.id)
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

module.exports = userRoutes