import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroup } from '../../redux/actions/groups.actions'

import PageTile from './../../components/pageTitle'
import HelpAlert from './../../components/themeComponents/helpAlert'
import PortletHead from './../../components/themeComponents/portletHead'
import GroupTable from './../../components/groups/groupTable'
import GroupSearch from './groupSearch'
import CreateGroup from './../../components/groups/createGroup'

class Groups extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      title: '',
      error: false
    }
    this.onCreate = this.onCreate.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.goToInfo = this.goToInfo.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.createdGroup) {
      this.props.history.push({
        pathname: `/groupDetail`,
        state: nextProps.createdGroup
      })
    }
  }
  updateTitle (e) {
    this.setState({title: e.target.value})
  }
  handleClose () {
    this.setState({ showModal: false })
  }
  onCreate (title) {
    if (title === '') {
      return
    }
    this.props.createGroup({title: title, wa_id: '1'})
  }
  goToInfo () {
    this.props.history.push({
      pathname: `/groupDetail`,
      state: '5b8d7031775a8c362af77153'
    })
  }
  render () {
    return (
      <div>
        <PageTile title={'Manage Groups'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the groups that you have joined.'} />
          {this.state.showModal &&
            <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose} heading='Create Group' updateTitle={this.updateTitle} />
          }
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Groups'} buttonTitle={'New Group'} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <GroupSearch />
                <GroupTable viewDetail={this.goToInfo} />
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
    createdGroup: state.groupReducer.createdGroup
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createGroup: createGroup
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
