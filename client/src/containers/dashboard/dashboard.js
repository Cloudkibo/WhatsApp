import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CardWithProgress from './../../components/dashboard/cardWithProgress'
import CardBox from './../../components/dashboard/cardbox'
import Report from './../../components/dashboard/report'
import PageTile from './../../components/pageTitle'
import * as UserActions from '../../redux/actions/user.actions'
import * as DashboardActions from '../../redux/actions/dashboard.actions'
import * as ContactActions from '../../redux/actions/contacts.actions'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    props.loadUserDetails()
    props.loadMessageCount()
    props.loadReceivedMessages()
    props.loadJoinedGroups()
    props.loadLeftGroups()
    props.loadUnreadMessages()
    props.loadContactsList()
  }
  render () {
    console.log('Props In Dashboard', this.props)
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Dashboard'} />
        <div className='m-content'>
          <div className='row'>
            <CardWithProgress totalGroups={this.props.dashboard.joinedGroups + this.props.dashboard.leftGroups} joinedGroups={this.props.dashboard.joinedGroups} LeftGroups={this.props.dashboard.leftGroups} />
            <div className='col-xl-6'>
              <div className='row m-row--full-height'>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                  <CardBox title='Total Contacts' number={this.props.contacts} color='brand' />
                  <div className='m--space-30' />
                  <CardBox title='Total Messages' number={this.props.dashboard.messageCount} color='danger' />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                  <CardBox title='Total Sessions' number={5} color='success' />
                  <div className='m--space-30' />
                  <CardBox title='Unread Messages' number={this.props.dashboard.unreadMessages} color='accent' />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            {/* <Report
              iconClassName={'fa fa-line-chart'}
              title={'Reports'}
              lineChartData=''
              week=''
              month=''
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
    user: state.userReducer.user,
    dashboard: state.dashboardReducer,
    contacts: state.contactsReducer.contactsList.length
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadUserDetails: UserActions.loadUserDetails,
    loadMessageCount: DashboardActions.getMessageCount,
    loadReceivedMessages: DashboardActions.getReceivedMessages,
    loadUnreadMessages: DashboardActions.getUnreadMessages,
    loadJoinedGroups: DashboardActions.getJoinedGroups,
    loadLeftGroups: DashboardActions.getLeftGroups,
    loadContactsList: ContactActions.loadContactsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
