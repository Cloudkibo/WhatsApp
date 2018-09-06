import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlert } from 'react-alert'
import * as SignupActions from '../../redux/actions/signup.actions'
import Signup from './../../components/signupLogin'
var taiPasswordStrength = require('tai-password-strength')
var strengthTester = new taiPasswordStrength.PasswordStrength()

class signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: false,
      strength: '',
      pwdBar: 0,
      pwd_color: 'red',
      ismatch: false,
      pwdlength: true
    }
  }
  componentWillMount () {
  document.getElementsByTagName('body')[0].className = 'm-page--fluid m--skin- m-content--skin-light2 m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
  }

  componentWillUnmount () {
    document.getElementsByTagName('body')[0].className = 'm-page--fluid m--skin- m-content--skin-light2 m-aside-left--fixed m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default'
  }
  componentWillReceiveProps (nextprops) {
    this.setState({error: false})
    if (nextprops.successSignup) {
      this.props.history.push({pathname: '/'})
    }
  }
  handlePwdChange = (event) => {
    this.setState({password: true})
    if (event.target.value.length <= 6) {
      this.setState({pwdlength: false})
    } else if (event.target.value.length > 6) {
      this.setState({pwdlength: true})
    }
    var result = strengthTester.check(event.target.value)
    var text = ''
    var bar = 0
    var color = 'red'
    switch (result.strengthCode) {
      case 'VERY_WEAK':
        text = 'WEAK'
        bar = 25
        color = 'red'
        break
      case 'WEAK':
        text = 'REASONABLE'
        bar = 50
        color = 'orange'
        break
      case 'REASONABLE':
        text = 'GOOD'
        bar = 75
        color = 'yellow'
        break
      case 'STRONG':
        text = 'STRONG'
        bar = 100
        color = 'green'
        break
      case 'VERY_STRONG':
        text = 'STRONG'
        bar = 100
        color = 'green'
        break
      default:
        text = ''
        bar = 0
        color = 'red'
    }
    this.setState({strength: text, pwdBar: bar, pwd_color: color})
  }
  onSubmit = (event, password, rpassword, companyName, email, phoneNumber) => {
    event.preventDefault()
    if (password.length > 6 && password === rpassword) {
      this.props.signUp({companyName: companyName, email: email, phone: phoneNumber, password: password}, this.props.alert)
    }
  }
  equal = (e, password) => {
    if (e.target.value === password) {
      this.setState({ismatch: true})
    } else {
      this.setState({ismatch: false})
    }
  }
  render () {
    return (
      <Signup type='Sign Up' equal={this.equal} onSubmit={this.onSubmit} handlePwdChange={this.handlePwdChange}
        password={this.state.password}
        strength={this.state.strength}
        pwdBar={this.state.pwdBar}
        pwd_color={this.state.pwd_color}
        ismatch={this.state.ismatch}
        pwdlength={this.state.pwdlength} />
    )
  }
}

function mapStateToProps (state) {
  return {
    successSignup: (state.signupReducer.successSignup),
    errorSignup: (state.signupReducer.errorSignup)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    signUp: SignupActions.signUp
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(signup))
