import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlert } from 'react-alert'
import * as _ from 'lodash'
import * as GroupActions from '../../redux/actions/groups.actions'
import { withRouter } from 'react-router-dom'
import PageTile from './../../components/pageTitle'
import HelpAlert from './../../components/themeComponents/helpAlert'
import PortletHead from './../../components/themeComponents/portletHead'
import GroupTable from './../../components/groups/groupTable'
import GroupSearch from './groupSearch'
import CreateGroup from './../../components/groups/createGroup'
import InviteModal from './../../components/groups/inviteModal'
import history from './../../history'

class Groups extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      title: '',
      error: false,
      selectedGroups: [],
      inviteLink: false
    }
  }
  componentDidMount () {
    this.props.loadGroupsList()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.createdGroup) {
      history.push({ pathname: `/groupDetail`, state: nextProps.createdGroup })
    }
  }
  updateTitle = (e) => {
    this.setState({title: e.target.value})
  }
  handleClose = () => {
    this.setState({ showModal: false })
  }
  onCreate = (title) => {
    if (title === '') {
      return this.props.alert.show('Group title cannot be empty', {type: 'error'})
    }
    this.props.createGroup({title: title, wa_id: '5b8effb1b020ef26b62f955f'})
  }
  goToInfo = (groupId) => {
    this.props.history.push({
      pathname: `/groupDetail`,
      state: {
        groupId: groupId
      }
    })
  }

  closeInvite = () => { this.setState({inviteLink: false}) }

  handleCheck = (event, groupId) => {
    let temp = []
    if (event.target.checked) {
      temp = _.union(this.state.selectedGroups, [groupId])
    } else {
      temp = _.difference(this.state.selectedGroups, [groupId])
    }
    this.setState({selectedGroups: temp})
  }

  leaveGroup = (event, data) => {
    if (data.value === 'leave_group') {
      this.props.leaveManyGroups({groupIds: this.state.selectedGroups})
    }
  }

  groupInvite = (group) => {
    if (group.invite) {
      this.setState({ inviteLink: group.inviteLink })
    } else {
      this.props.getGroupInvite(group.groupId)
        .then(res => {
          this.setState({ inviteLink: res.payload })
        })
        .catch(err => {
          this.props.alert.show('Unable to fetch invite link', {type: 'failed'})
          console.log('Error', err)
        })
    }
  }
  render () {
    return (
      <div>
        <PageTile title={'Manage Groups'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the groups that you have joined.'} />
          <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose}
            heading='Create Group' updateTitle={this.updateTitle} />
          <InviteModal showModal={this.state.inviteLink} handleClose={this.closeInvite} heading='Invite Link'
            inviteLink={this.state.inviteLink} />
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Groups'} buttonTitle={'New Group'} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <GroupSearch groups={this.props.groups} leaveGroup={this.leaveGroup} />
                <GroupTable viewDetail={this.goToInfo} groups={this.props.groups}
                  getInvite={this.groupInvite} handleCheck={this.handleCheck} />
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
    createdGroup: state.groupReducer.createdGroup,
    groups: state.groupReducer.groups
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createGroup: GroupActions.createGroup,
    loadGroupsList: GroupActions.loadGroupsList,
    getGroupInvite: GroupActions.getGroupInvite,
    leaveManyGroups: GroupActions.leaveManyGroups
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAlert(Groups)))
