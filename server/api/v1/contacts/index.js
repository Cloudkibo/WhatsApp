const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()
const router = express.Router()

const controller = require('./contacts.controller')

router.get('/', controller.index)
router.post('/uploadContacts', multipartyMiddleware, controller.uploadContacts)
router.post('/create', controller.create)
router.post('/update', controller.update)

module.exports = router
