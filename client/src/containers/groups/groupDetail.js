import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadImage, getGroupInfo, getGroupIcon, updateGroup } from '../../redux/actions/groups.actions'
import { getParticiapnts, getAdmins } from '../../redux/actions/contacts.actions'
import PageTile from './../../components/pageTitle'
import InfoHeader from './../../components/groups/infoHeader'
import ParticipantList from './../../components/groups/participants'
import CreateGroup from './../../components/groups/createGroup'
import _ from 'lodash'

class GroupDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      title: '',
      participants: []
    }
    props.getGroupInfo({groupId: props.history.location.state.groupId})
    props.getGroupIcon(props.history.location.state.groupId)
    props.getParticiapnts({ids: props.history.location.state.participants})
    props.getAdmins({ids: props.history.location.state.admins})
    this._onChange = this._onChange.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }
  updateTitle (e) {
    console.log('e.target.value')
    this.setState({title: e.target.value})
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps)
    if (nextProps.groupsInfo) {
      this.setState({title: nextProps.groupsInfo.title})
      //  this.props.getContacts({ids: nextProps.groupsInfo.participants})
    }
    if (nextProps.admins && nextProps.participants) {
      console.log('nextProps.admins', nextProps.admins)
      console.log('nextProps.participants', nextProps.participants)
      let temp = []
      for (let i = 0; i < nextProps.participants.length; i++) {
        let data = {
          name: nextProps.participants[i].name,
          admin: false
        }
        for (let j = 0; j < nextProps.admins.length; j++) {
          if (nextProps.participants[i].wa_id === nextProps.admins[j].wa_id) {
            data.admin = true
          }
        }
        temp.push(data)
      }
      console.log('data', temp)
      this.setState({participants: temp})
    }
  }
  showModal (nextProps) {
    this.setState({showModal: true})
  }
  handleClose () {
    this.setState({ showModal: false })
  }
  onCreate (title) {
    console.log('title:', title)
    if (title === '') {
      console.log('in if')
      return
    }
    this.handleClose()
    this.props.updateGroup({title: title, groupId: this.props.groupsInfo.groupId})
  }
  _onChange (e) {
    var files = e.target.files
    var file = e.target.files[files.length - 1]
    var fileData = new FormData()
    fileData.append('file', file)
    fileData.append('filename', file.name)
    fileData.append('filetype', file.type)
    fileData.append('filesize', file.size)
    fileData.append('componentType', this.state.componentType)
    console.log('file', file)
    this.setState({uploadDescription: 'File is uploading..'})
    this.props.uploadImage(fileData, this.props.history.location.state.groupId)
  }
  render () {
    return (
      <div style={{width: 80 + 'vw'}}>
        <PageTile title={'Group Info'} />
        {this.state.showModal &&
          <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose} heading='Edit Group Title' title={this.state.title} updateTitle={this.updateTitle} />
        }
        <div className='m-content'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  {this.props.groupsInfo &&
                  <InfoHeader groupsInfo={this.props.groupsInfo} handleImage={this._onChange} showModal={this.showModal} />
                  }
                  {this.state.participants && this.state.participants.length > 0 &&
                  <ParticipantList participants={this.state.participants} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    groupsInfo: state.groupReducer.groupsInfo,
    participants: state.contactReducer.participants,
    admins: state.contactReducer.admins
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    uploadImage: uploadImage,
    getGroupInfo: getGroupInfo,
    getGroupIcon: getGroupIcon,
    updateGroup: updateGroup,
    getParticiapnts: getParticiapnts,
    getAdmins: getAdmins
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
