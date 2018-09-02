const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const utility = require('./../../../components/utility')

const _ = require('lodash')

const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve all groups')
  Groups.find({}, (err, groups) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at Index: ${JSON.stringify(err)}`)
    }

    // Using the utility method to fetch from whatsapp docker
    utility.getFromWhatsapp('/v1/groups/', (err, wgroups) => {
      if (err) {
        return logger.serverLog(TAG, `Error from Whatsapp docker: ${JSON.stringify(err)}`)
      }

      res.status(200).json({ status: 'success', payload: groups })
      // TODO: We need to compare the ids of wgroups and groups and add those not in groups to DB
      // We can fetch detailed information of a group by passing group id to id endpoint
    })
  })
}

exports.GetGroupInformation = function (req, res) {
  logger.serverLog(TAG, 'Hit the information of particular group')
  Groups.findOne({groupId: req.body.groupId}, (err, group) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at GetGroupInformation: ${JSON.stringify(err)}`)
    }

    if (group) {
      // It means we have found the details in our db
      res.status(200).json({ status: 'success', payload: group })
    } else {
      // We don't have details in our db. We need to fetch from Whatsapp docker.
      utility.getFromWhatsapp('/v1/groups/' + req.body.groupId, (err, wgroup) => {
        if (err) {
          return logger.serverLog(TAG, `Error from Whatsapp docker: ${JSON.stringify(err)}`)
        }

        // Save the wgroup in local db
        let payload = {
          title: wgroup.data.subject,
          admins: wgroup.data.admins,
          creator: wgroup.data.creator,
          participants: wgroup.data.participants,
          createtime: wgroup.data.creation_time
        }

        Groups.create(payload, (err, result) => {
          if (err) {
            return logger.serverLog(TAG, `Internal Server error ${JSON.stringify(err)}`)
          }

          res.status(200).json({ status: 'success', payload: result })
        })
      })
    }
  })
}

exports.UpdateGroupInformation = function (req, res) {
  logger.serverLog(TAG, 'Hit the information of particular group')
  Groups.findOne({groupdId: req.body.groupId}, (err, group) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
    }

    // Group found
    if (group) {
      group.title = req.body.title
      let params = {
        'subject': req.body.title
      }
      // update group on whatsapp docker
      utility.putToWhatsapp('/v1/groups/' + req.body.groupId, params, (err, result) => {
        if (err) {
          return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
        }

        group.save(err => {
          if (err) return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)

          res.status(200).json({ status: 'success', payload: result.data })
        })
      })
    } else {
      // group not found
      res.status(404).json({ status: 'success', payload: 'Group was not found' })
    }
  })
}

exports.CreateGroup = function (req, res) {
  utility.postToWhatsapp('/v1/groups', { subject: req.body.title }, (err, result) => {
    if (err) {
      logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', description: err })
    }
    const groupId = result.data.groups && result.data.groups.length === 1 && result.data.groups[0].id
    const createtime = result.data.groups && result.data.groups.length === 1 && result.data.groups[0].creation_time
    logger.serverLog(TAG, JSON.stringify(result.data.groups))
    const data = {
      title: req.body.title,
      groupId: groupId,
      admins: [req.body.userId ? req.body.userId : 'userID'],
      creator: req.body.userId ? req.body.userId : 'userID',
      participants: [ req.body.userId ? req.body.userId : 'userID' ],
      createtime: createtime
    }

    let newGroup = new Groups(data)
    newGroup.save(function (err) {
      if (err) {
        return res.status(500).json({ status: 'failed', description: err })
      } else {
        return res.status(200).json({ status: 'success', payload: data })
      }
    })
  })
}

exports.CreateGroupInvite = function (req, res) {
  utility.getFromWhatsapp(`/v1/groups/${req.body.groupId}/invite`, (err, result) => {
    if (err) {
      logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', description: err })
    }

    logger.serverLog(TAG, result.data.groups)

    Groups.findOne({groupId: req.body.groupId})
      .exec()
      .then(group => {
        group.invite = true
        group.inviteLink = result.data.groups[0] && result.data.groups[0].link ? result.data.groups[0].link : 'no link was provided by whatsapp'
        group.save(err => {
          err
            ? res.status(500).json({ status: 'failed', description: err })
            : res.status(200).json({ status: 'success', payload: group.inviteLink })
        })
      })
      .catch(err => {
        res.status(500).json({ status: 'failed', description: err })
      })
  })
}

exports.leave = function (req, res) {
  Groups.findOne({groupId: req.params.groupId})
    .exec()
    .then(group => {
      if (group) {
        utility.postToWhatsapp(`/v1/groups/${req.params.groupId}/leave`, {}, (err, result) => {
          if (err) {
            logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
            return res.status(500).json({ status: 'failed', description: err })
          }
          if (result.status === 200) {
            group.groupLeft = true
            _.pull(group.admins, req.params.groupId)
            _.pull(group.participants, req.params.groupId)
            group.save(err => {
              err
                ? res.status(500).json({ status: 'failed', description: err })
                : res.status(200).json({ status: 'success', payload: group })
            })
          } else {
            return res.status(result.status).json({ status: 'failed' })
          }
        })
      } else {
        return res.status(404).json({ status: 'failed' })
      }
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', description: err })
    })
}
