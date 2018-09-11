import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CardWithProgress from './../../components/dashboard/cardWithProgress'
import CardBox from './../../components/dashboard/cardbox'
import Report from './../../components/dashboard/report'
import PageTile from './../../components/pageTitle'
import * as UserActions from '../../redux/actions/user.actions'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    props.loadUserDetails()
  }
  render () {
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Dashboard'} />
        <div className='m-content'>
          <div className='row'>
            <CardWithProgress totalGroups={10} joinedGroups={8} LeftGroups={2} />
            <div className='col-xl-6'>
              <div className='row m-row--full-height'>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                  <CardBox title='Total Contacts' number={10} color='brand' />
                  <div className='m--space-30' />
                  <CardBox title='Total Messages' number={15} color='danger' />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                  <CardBox title='Total Sessions' number={5} color='success' />
                  <div className='m--space-30' />
                  <CardBox title='Unread Messages' number={3} color='accent' />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <Report
              iconClassName={'fa fa-line-chart'}
              title={'Reports'}
              lineChartData=''
              week=''
              month=''
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
    user: state.userReducer.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadUserDetails: UserActions.loadUserDetails
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
