import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isEmail } from '../../utility/utils'
import { withAlert } from 'react-alert'

import * as LoginActions from '../../redux/actions/login.actions'
import Login from './../../components/signupLogin'

class login extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onSubmit = (event, password, rpassword, companyName, email, phoneNumber) => {
    event.preventDefault()
    console.log('isEmail', isEmail(email))
    if (isEmail(email)) {
      this.props.logIn({companyName: companyName, email: email, password: password}, this.props.alert)
    } else {
      this.props.logIn({companyName: companyName, phone: email, password: password}, this.props.alert)
    }
  }
  componentWillMount () {
  document.getElementsByTagName('body')[0].className = 'm-page--fluid m--skin- m-content--skin-light2 m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
  }
  componentWillReceiveProps (nextprops) {
    if (nextprops.successMessage) {
      this.props.history.push({pathname: '/'})
    }
  }

  componentWillUnmount () {
    document.getElementsByTagName('body')[0].className = 'm-page--fluid m--skin- m-content--skin-light2 m-aside-left--fixed m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
  }
  render () {
    return (
      <Login type='Sign In' onSubmit={this.onSubmit} />
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: (state.loginReducer.errorMessage),
    successMessage: (state.loginReducer.successMessage)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    logIn: LoginActions.logIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(login))
