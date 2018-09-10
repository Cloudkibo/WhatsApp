const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()
const router = express.Router()

const controller = require('./contacts.controller')

router.get('/', controller.index)
router.post('/', controller.fetchMany)
router.post('/upload', multipartyMiddleware, controller.uploadContacts)
router.post('/create', controller.create)
router.put('/:phone', controller.update)
router.delete('/:phone', controller.delete)

module.exports = router
