const express = require('express')
const router = express.Router()
const controller = require('./messages.controller')

router.post('/', controller.create)

module.exports = router
