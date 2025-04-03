import express from 'express'
const weatherRoutes = express.Router()

// get all
weatherRoutes.get('/weather', (req, res) => {
  res.send('get all called...')
})

// get one
weatherRoutes.get('/weather/:id', (req, res) => {
  res.send(req.params.id)
})

// create one
weatherRoutes.post('/weather', (req, res) => {
  const body = req.body
})

// updating one
weatherRoutes.patch('/weather/:id', (req, res) => {

})


// delete one
weatherRoutes.get('/weather/:id', (req, res) => {

})

export default weatherRoutes