const express = require('express')

const router = express.Router()

const controller = require('./groups.controller')

router.get('/', controller.index)
router.post('/GetGroupInformation', controller.GetGroupInformation)
router.post('/UpdateGroupInformation', controller.UpdateGroupInformation)
router.post('/CreateGroup', controller.CreateGroup)
router.post('/CreateGroupInvite', controller.CreateGroupInvite)
// A/c to REST Standard
router.post('/:groupId/leave', controller.leave)

module.exports = router
