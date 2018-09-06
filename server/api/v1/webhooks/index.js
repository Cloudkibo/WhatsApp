const express = require('express')
const router = express.Router()

const controller = require('./webhooks.controller')

router.get('/', controller.index)
router.post('/', controller.webhook)

module.exports = router
