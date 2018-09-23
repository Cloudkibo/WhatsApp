const express = require('express')
const router = express.Router()

const controller = require('./analytics.controller')
const auth = require('../../../auth/auth.service')

router.get('/messageCount', auth.isAuthenticated(), controller.getTotalMessages)

router.get('/recievedMessages', auth.isAuthenticated(), controller.getRecievedMessages)

router.get('/unreadMessages', auth.isAuthenticated(), controller.getUnreadMessages)

router.get('/uploadedMedia', auth.isAuthenticated(), controller.getUploadedMedia)

router.get('/joinedGroups', auth.isAuthenticated(), controller.getJoinedGroups)

router.get('/leftGroups', auth.isAuthenticated(), controller.getLeftGroups)

module.exports = router
