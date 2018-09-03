import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroup } from '../../redux/actions/groups.actions'
import { Message } from 'semantic-ui-react'

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
      showModal: false
    }
    this.onCreate = this.onCreate.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
    this.props.createGroup({title: title})
  }
  render () {
    return (
      <div>
        <PageTile title={'Manage Groups'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the groups that you have joined.'} />
          {this.state.showModal &&
            <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose} />
          }
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Groups'} buttonTitle={'New Group'} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <GroupSearch />
                <GroupTable viewDetail={() => { this.props.history.push('/groupDetail') }} />
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
    message: state.testReducer.serverMessage
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createGroup: createGroup
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
