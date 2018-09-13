import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import * as GroupActions from '../../redux/actions/groups.actions'
import PageTile from './../../components/pageTitle'
import InfoHeader from './../../components/groups/infoHeader'
import ParticipantList from './../../components/groups/participants'
import CreateGroup from './../../components/groups/createGroup'

class GroupDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      title: '',
      selectedGroup: false
    }
    props.getGroupIcon(props.history.location.state.groupId)
  }
  updateTitle = (e) => {
    this.setState({title: e.target.value})
  }
  componentDidMount () {
    let selectedGroup = this.props.groups.filter(item => item.groupId === this.props.history.location.state.groupId)[0]
    this.setState({selectedGroup, title: selectedGroup.title})
    this.props.getParticiapnts(selectedGroup.groupId, {ids: selectedGroup.participants})
  }
  showModal = (nextProps) => {
    this.setState({showModal: true})
  }
  handleClose = () => {
    this.setState({ showModal: false })
  }

  onCreate = (title) => {
    if (title === '') {
      return this.props.alert.show('Group title cannot be empty', {type: 'error'})
    }
    this.handleClose()
    this.props.updateGroup({title: title, groupId: this.state.selectedGroup.groupId})
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

  handleAdmin = (particpant) => {
    console.log('Participant', particpant.wa_id, particpant.admin)
    if (particpant.admin) {
      this.props.deleteAdmin(this.state.selectedGroup.groupId, [particpant.wa_id])
    } else {
      this.props.createAdmin(this.state.selectedGroup.groupId, [particpant.wa_id])
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
                  {this.state.selectedGroup &&
                  <InfoHeader groupsInfo={this.state.selectedGroup} participants={this.props.participants} handleImage={this._onChange} showModal={this.showModal} />
                  }
                  {this.props.participants && this.props.participants.length > 0 &&
                  <ParticipantList participants={this.props.participants} deleteParticipants={this.props.deleteParticipants}
                    handleAdmin={this.handleAdmin} groupsInfo={this.state.selectedGroup} />
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
  console.log('Redux State', state)
  return {
    groupsInfo: state.groupReducer.groupsInfo,
    groups: state.groupReducer.groups,
    participants: state.groupReducer.participants,
    user: state.userReducer.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    uploadImage: GroupActions.uploadImage,
    getGroupIcon: GroupActions.getGroupIcon,
    updateGroup: GroupActions.updateGroup,
    createAdmin: GroupActions.createAdmin,
    deleteAdmin: GroupActions.deleteAdmin,
    getParticiapnts: GroupActions.getParticiapnts,
    deleteParticipants: GroupActions.deleteParticipants
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAlert(GroupDetail)))
