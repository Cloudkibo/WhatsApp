const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const utility = require('./../../../components/utility')
const config = require('./../../../config/environment')

const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const _ = require('lodash')
const request = require('request')

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

exports.leaveMany = function (req, res) {
  let respPayload = []
  let Ids = req.body.groupIds ? req.body.groupIds : []
  Ids.forEach((id, index) => {
    Groups.findOne({groupId: id})
      .exec()
      .then(group => {
        if (group) {
          utility.postToWhatsapp(`/v1/groups/${id}/leave`, {}, (err, result) => {
            if (err) {
              logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
            }
            if (result.status === 200) {
              group.groupLeft = true
              _.pull(group.admins, id)
              _.pull(group.participants, id)
              group.save(err => {
                if (err) {
                  return res.status(500).json({ status: 'failed', description: err })
                }

                respPayload.push(group)
                if (index === (Ids.length - 1)) {
                  // It means at last index. Now send the response
                  res.status(200).json({ status: 'success', payload: respPayload })
                }
              })
            }
          })
        }
      })
      .catch(err => {
        return res.status(500).json({ status: 'failed', description: err })
      })
  })
}

exports.postIcon = function (req, res) {
  logger.serverLog(TAG, 'Hit the postIcon endpoint')
  let today = new Date()
  let uid = crypto.randomBytes(5).toString('hex')
  let serverPath = 'f' + uid + '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()

  serverPath += '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
  let fext = req.files.file.name.split('.')

  serverPath += '.' + fext[fext.length - 1]

  let dir = path.resolve(__dirname, '../../../../uploaded_files/')

  if (req.files.file.size === 0) {
    return res.status(400).json({
      status: 'failed',
      description: 'No file submitted'
    })
  }

  fs.rename(req.files.file.path, dir + '/userfiles' + serverPath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: 'internal server error' + JSON.stringify(err)
      })
    }

    // Using request here because Axios does not support sending multi part form data natively.
    let formData = {'file': fs.createReadStream(dir + '/userfiles' + serverPath)}
    request.post({url: `${config.docker_url}/v1/groups/${req.params.groupId}/icon`, formData: formData}, (err, body, result) => {
      if (err) {
        logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
        return res.status(500).json({ status: 'failed', description: err })
      }
      logger.serverLog(TAG, result)
      if (body.statusCode === 200) {
        Groups.findOne({groupId: req.params.groupId})
          .exec()
          .then(group => {
            group.iconURL = dir + '/userfiles' + serverPath
            group.save(err => {
              err
                ? res.status(500).json({ status: 'failed', description: err })
                : res.status(200).json({ status: 'success' })
            })
          })
          .catch(err => {
            return res.status(500).json({ status: 'failed', description: err })
          })
      } else {
        return res.status(body.statusCode).json({ status: 'failed' })
      }
    })
  })
}

exports.deleteIcon = function (req, res) {
  utility.deleteFromWhatsapp(`/v1/groups/${req.params.groupId}/icon`, (err, result) => {
    if (err) {
      logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', description: err })
    }

    if (result.status === 200) {
      Groups.findOne({groupId: req.params.groupId})
        .exec()
        .then(group => {
          // delete the file from file system
          fs.unlink(group.iconURL, err => {
            if (err) {
              logger.serverLog(TAG, `Internal Server error at deleting from file system: ${JSON.stringify(err)}`)
              return res.status(500).json({ status: 'failed', description: err })
            }

            group.iconURL = ''
            group.save(err => {
              err
                ? res.status(500).json({ status: 'failed', description: err })
                : res.status(200).json({ status: 'success' })
            })
          })
        })
        .catch(err => {
          return res.status(500).json({ status: 'failed', description: err })
        })
    } else {
      return res.status(result.status).json({ status: 'failed' })
    }
  })
}

exports.getIcon = function (req, res) {
  Groups.findOne({groupId: req.params.groupId})
    .exec()
    .then(group => {
      if (group.iconURL === '') {
        // Icon is not set. Send a default avatar
        let dir = path.resolve(__dirname, '../../../../uploaded_files/')
        res.sendFile(dir + '/groupAvatar.png')
      } else {
        // Icon is set
        res.sendFile(group.iconURL)
      }
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', description: err })
    })
}
