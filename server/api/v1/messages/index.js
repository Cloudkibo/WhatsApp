const express = require('express')
const router = express.Router()
const controller = require('./messages.controller')

const auth = require('../../../auth/auth.service')

router.get('/', auth.isAuthenticated(), controller.getMessages)
router.post('/', auth.isAuthenticated(), controller.create)

module.exports = router
