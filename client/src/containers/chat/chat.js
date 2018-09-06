import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageTile from './../../components/pageTitle'
import Header from './../../components/chat/header'
import SessionsList from './../../components/chat/sessionsList'
import SessionSearch from './sessionSearch'
import Chatbox from './chatbox'
import Conversation from './../../components/chat/conversation'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Chat'} />
        <div className='m-content'>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-4' style={{padding: '0px'}}>
              <div className='m-portlet'>
                <SessionSearch />
                <SessionsList />
              </div>
            </div>
            <div className='col-lg-8 col-md-8 col-sm-8' style={{padding: '0px', marginLeft: '-2px'}}>
              <div className='m-portlet'>
                <Header name='anisha' lastSeen='Last seen today at 1:40 PM' />
                <div className='m-portlet__body' style={{borderLeft: '1px solid rgb(144, 144, 144)', borderRight: '1px solid rgb(144, 144, 144)', borderBottom: '1px solid rgb(144, 144, 144)', padding: '0px'}} >
                  <Conversation />
                  <Chatbox />
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

  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
