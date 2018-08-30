const express = require('express')

const router = express.Router()

const controller = require('./contacts.controller')

router.get('/', controller.index)
router.post('/sendToWhatsapp', controller.sendToWhatsapp)
router.post('/create', controller.create)
router.post('/update', controller.update)

module.exports = router
