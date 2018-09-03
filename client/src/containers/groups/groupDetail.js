import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageTile from './../../components/pageTitle'
import InfoHeader from './../../components/groups/infoHeader'
import ParticipantList from './../../components/groups/participants'

class GroupDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div style={{width: 80 + 'vw'}}>
        <PageTile title={'Group Info'} />
        <div className='m-content'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <InfoHeader groupName={'Group Name'} createdAt={'20-Aug-2018'} participants={'05'} admins={'02'} />
                  <ParticipantList />
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
    message: state.testReducer.serverMessage
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
