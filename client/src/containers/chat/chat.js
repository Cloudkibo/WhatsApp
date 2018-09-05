import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './../../components/chat/header'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <Login name='anisha' lastSeen='Last seen today at 1:40 PM' />
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
