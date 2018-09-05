import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageTile from './../../components/pageTitle'
import Header from './../../components/chat/header'
import Sidebar from './../../components/chat/sidebar'

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
            <Sidebar />
            <Header name='anisha' lastSeen='Last seen today at 1:40 PM' />
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
