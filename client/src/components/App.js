import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { getTestMessage } from './../redux/actions/test.action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Main from './Main'
import Header from './header.js'
import Sidebar from './sidebar.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSidebar: true
    }
  }
  componentDidMount () {
    this.props.getTestMessage()
  }
  componentWillMount () {
    if (window.location.pathname === '/signup' || window.location.pathname === '/login') {
      this.setState({showSidebar: false})
      /* eslint-disable */
      if ($('#sidebarDiv')) {
        $('#sidebarDiv').removeClass('hideSideBar')
      }
      if ($('#headerDiv')) {
        $('#headerDiv').removeClass('hideHeader')
      }
      /* eslint-enable */
    }
  }
  render () {
    return (
      <div className='App'>
        {this.state.showSidebar &&
        <Header />
        }
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          {this.state.showSidebar &&
          <Sidebar />
          }
          <Main />
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
