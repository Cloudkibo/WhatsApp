const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

const router = express.Router()
const controller = require('./media.controller')
const auth = require('../../../auth/auth.service')

router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.uploadMedia)

router.get('/:mediaId', auth.isAuthenticated(), controller.getMedia)

router.delete('/:mediaId', auth.isAuthenticated(), controller.deleteMedia)

module.exports = router
