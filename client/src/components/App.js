import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { getTestMessage } from './../redux/actions/test.action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  componentDidMount () {
    this.props.getTestMessage()
  }

  render () {
    return (
      <div className='App'>
        <header>
          <h1>Hello G</h1>
        </header>
        <p>
          {this.props.message}
        </p>
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
