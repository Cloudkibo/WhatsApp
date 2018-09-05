import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GroupActions from '../../redux/actions/groups.actions'
import PageTile from './../../components/pageTitle'
import InfoHeader from './../../components/groups/infoHeader'
import ParticipantList from './../../components/groups/participants'
import CreateGroup from './../../components/groups/createGroup'
import * as _ from 'lodash'

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
  }
  updateTitle = (e) => {
    this.setState({title: e.target.value})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.groupsInfo) {
      this.setState({title: nextProps.groupsInfo.title})
    }
    if (nextProps.groupsInfo && nextProps.groupsInfo.participants !== this.props.groupsInfo.participants) {
      this.props.getParticiapnts({ids: nextProps.groupsInfo.participants})
    }
    if (nextProps.groupsInfo && nextProps.groupsInfo.admins !== this.props.groupsInfo.admins) {
      this.props.getAdmins({ids: nextProps.groupsInfo.admins})
    }
    if (nextProps.admins && nextProps.participants) {
      let participants = _.differenceBy(nextProps.participants, nextProps.admins, 'wa_id')
      participants = _.map(participants, (item) => ({name: item.name, wa_id: item.wa_id, admin: false}))
      let admins = _.map(nextProps.admins, (item) => ({name: item.name, wa_id: item.wa_id, admin: true}))
      let temp = admins.concat(participants)
      this.setState({participants: temp})
    }
  }
  showModal = (nextProps) => {
    this.setState({showModal: true})
  }
  handleClose = () => {
    this.setState({ showModal: false })
  }
  onCreate = (title) => {
    if (title !== '') {
      this.handleClose()
      this.props.updateGroup({title: title, groupId: this.props.groupsInfo.groupId})
    }
  }
  _onChange = (e) => {
    if (e.target.files.length > 0) {
      let files = e.target.files
      let file = e.target.files[files.length - 1]
      let fileData = new FormData()
      fileData.append('file', file)
      fileData.append('filename', file.name)
      fileData.append('filetype', file.type)
      fileData.append('filesize', file.size)
      fileData.append('componentType', this.state.componentType)
      this.setState({uploadDescription: 'File is uploading..'})
      this.props.uploadImage(fileData, this.props.history.location.state.groupId)
    }
  }
  render () {
    return (
      <div style={{width: 80 + 'vw'}}>
        <PageTile title={'Group Info'} />
        {this.state.showModal &&
          <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose}
            heading='Edit Group Title' title={this.state.title} updateTitle={this.updateTitle} />
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
    participants: state.groupReducer.participants,
    admins: state.groupReducer.admins
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    uploadImage: GroupActions.uploadImage,
    getGroupInfo: GroupActions.getGroupInfo,
    getGroupIcon: GroupActions.getGroupIcon,
    updateGroup: GroupActions.updateGroup,
    getParticiapnts: GroupActions.getParticiapnts,
    getAdmins: GroupActions.getAdmins
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
