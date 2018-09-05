import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GroupActions from '../../redux/actions/groups.actions'

import PageTile from './../../components/pageTitle'
import HelpAlert from './../../components/themeComponents/helpAlert'
import PortletHead from './../../components/themeComponents/portletHead'
import GroupTable from './../../components/groups/groupTable'
import GroupSearch from './groupSearch'
import CreateGroup from './../../components/groups/createGroup'
import InviteModal from './../../components/groups/inviteModal'

class Groups extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      displayInvite: false,
      title: '',
      error: false
    }
    props.loadGroupsList()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.createdGroup) {
      this.props.history.push({ pathname: `/groupDetail`, state: nextProps.createdGroup })
    }
    if (this.props.inviteLink !== nextProps.inviteLink) {
      this.setState({displayInvite: true})
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
      return
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

  closeInvite = () => { this.setState({displayInvite: false}) }

  render () {
    return (
      <div>
        <PageTile title={'Manage Groups'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the groups that you have joined.'} />
          {this.state.showModal &&
            <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose}
              heading='Create Group' updateTitle={this.updateTitle} />
          }
          {this.state.displayInvite &&
            <InviteModal showModal={this.state.displayInvite} handleClose={this.closeInvite} heading='Invite Link'
              inviteLink={this.props.inviteLink} />
          }
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Groups'} buttonTitle={'New Group'} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <GroupSearch groups={this.props.groups} />
                <GroupTable viewDetail={this.goToInfo} groups={this.props.groups} getInvite={this.props.getGroupInvite} />
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
    groups: state.groupReducer.groups,
    inviteLink: state.groupReducer.inviteLink
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createGroup: GroupActions.createGroup,
    loadGroupsList: GroupActions.loadGroupsList,
    getGroupInvite: GroupActions.getGroupInvite
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
