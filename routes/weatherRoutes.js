const express = require('express')
const routes = express.Router()

// get all
routes.get('/', (req, res) => {
  res.send('get all called...')
})

// get one
routes.get('/:id', (req, res) => {
  res.send(req.params.id)
})

// create one
routes.post('/', (req, res) => {
  const body = req.body
})

// updating one
routes.patch('/:id', (req, res) => {

})


// delete one
routes.get('/:id', (req, res) => {

})

module.exports = routes