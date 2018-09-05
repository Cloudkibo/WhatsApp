const express = require('express')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()

const router = express.Router()

const controller = require('./groups.controller')

router.get('/', controller.index)

// Need to update endpoints according to REST Standard
router.post('/GetGroupInformation', controller.GetGroupInformation)
router.post('/UpdateGroupInformation', controller.UpdateGroupInformation)
router.post('/CreateGroup', controller.CreateGroup)
router.get('/:groupId/invite', controller.CreateGroupInvite)

// A/c to REST Standard
router.post('/:groupId/leave', controller.leave)
router.post('/leave', controller.leaveMany)
router.post('/:groupId/icon', multipartyMiddleware, controller.postIcon)
router.delete('/:groupId/icon', controller.deleteIcon)
router.get('/:groupId/icon', controller.getIcon)

module.exports = router
