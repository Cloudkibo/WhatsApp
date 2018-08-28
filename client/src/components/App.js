import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { getTestMessage } from './../redux/actions/test.action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './header.js'
import Sidebar from './sidebar.js'

class App extends Component {
  componentDidMount () {
    this.props.getTestMessage()
  }

  render () {
    return (
      <div className='App'>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Sidebar />
          <p>
            {this.props.message}
          </p>
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
    getTestMessage: getTestMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
