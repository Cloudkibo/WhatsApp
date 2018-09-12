const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

const router = express.Router()

const controller = require('./groups.controller')
const participants = require('./participants.controller')
const admins = require('./admin.controller')
const auth = require('../../../auth/auth.service')

router.get('/', auth.isAuthenticated(), controller.index)
router.get('/:groupId', auth.isAuthenticated(), controller.GetGroupInformation)
router.put('/:groupId', auth.isAuthenticated(), controller.UpdateGroupInformation)
router.post('/', auth.isAuthenticated(), controller.CreateGroup)
router.get('/:groupId/invite', auth.isAuthenticated(), controller.CreateGroupInvite)
router.post('/:groupId/leave', auth.isAuthenticated(), controller.leave)
router.post('/leave', auth.isAuthenticated(), controller.leaveMany)
router.post('/:groupId/icon', auth.isAuthenticated(), multipartyMiddleware, controller.postIcon)
router.delete('/:groupId/icon', auth.isAuthenticated(), controller.deleteIcon)
router.get('/:groupId/icon', controller.getIcon)
router.delete('/:groupId/participants', auth.isAuthenticated(), participants.deleteParticipants)
router.post('/:groupId/participants', auth.isAuthenticated(), participants.fetchMany)
router.patch('/:groupId/admins', auth.isAuthenticated(), admins.addAdmin)
router.delete('/:groupId/admins', auth.isAuthenticated(), admins.deleteAdmin)

module.exports = router
