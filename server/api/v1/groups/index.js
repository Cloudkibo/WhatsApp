const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

const router = express.Router()

const controller = require('./groups.controller')
const participants = require('./participants.controller')

router.get('/', controller.index)
router.get('/:groupId', controller.GetGroupInformation)
router.put('/:groupId', controller.UpdateGroupInformation)
router.post('/', controller.CreateGroup)
router.get('/:groupId/invite', controller.CreateGroupInvite)
router.post('/:groupId/leave', controller.leave)
router.post('/leave', controller.leaveMany)
router.post('/:groupId/icon', multipartyMiddleware, controller.postIcon)
router.delete('/:groupId/icon', controller.deleteIcon)
router.get('/:groupId/icon', controller.getIcon)
router.delete('/:groupId/participants', participants.deleteParticipants)

module.exports = router
