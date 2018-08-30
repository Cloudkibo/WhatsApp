const path = require('path')
const config = require('./config/environment/index')

module.exports = function (app) {
  const env = app.get('env')

  // API middlewares go here
  app.use('/api/v1/test', require('./api/v1/test'))
  app.use('/api/v1/groups', require('./api/v1/groups'))
  // auth middleware go here

  app.get('/', (req, res) => {
    res.sendFile('./../client/build/index.html')
  })

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })

  app.route('/*').get((req, res) => {
    res.redirect('/')
  }).post((req, res) => {
    res.redirect('/')
  })
}
