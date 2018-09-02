import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { getTestMessage } from './../redux/actions/test.action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
class Groups extends Component {
  componentDidMount () {
    this.props.getTestMessage()
  }

  render () {
    return (
      <div>
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <h1>Manage Groups</h1>
          <p>
            <Button loading primary>{this.props.message}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
