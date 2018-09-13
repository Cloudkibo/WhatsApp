const express = require('express')
const router = express.Router()

const controller = require('./analytics.controller')

router.get('/sentMessages/:wa_id', controller.getSentMessages)

router.get('/recievedMessages/:wa_id', controller.getRecievedMessages)

router.get('/unreadMessages/:wa_id', controller.getUnreadMessages)

router.get('/uploadedMedia/:wa_id', controller.getUploadedMedia)

router.get('/joinedGroups/:wa_id', controller.getJoinedGroups)

router.get('/adminGroups/:wa_id', controller.getAdminGroups)

module.exports = router
