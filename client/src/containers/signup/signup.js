import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Signup from './../../components/signup'
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
      pwdlength: true,
      error: false
    }
    this.handlePwdChange = this.handlePwdChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.equal = this.equal.bind(this)
  }
  handlePwdChange (event) {
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
    this.setState({strength: text})
    this.setState({pwdBar: bar})
    this.setState({pwd_color: color})
    console.log('in handlePwdChange', event.target.value)
  }
  onSubmit (event) {
    this.setState({error: false})
    event.preventDefault()
    if (this.refs.password.value.length > 6 && this.refs.password.value === this.refs.rpassword.value) {
      let data = {}
      if (this.state.account_type === 'team') {
        data = {
          name: this.refs.name.value.trim(),
          email: this.refs.email.value.trim(),
          domain: this.refs.domain.value.trim(),
          password: this.refs.password.value.trim(),
          company_name: this.refs.companyName.value.trim(),
          uiMode: this.state.mode
        }
      } else {
        data = {
          name: this.refs.name.value.trim(),
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim(),
          uiMode: this.state.mode
        }
      }

      this.props.signUp(data, this.msg)
    }
  }
  equal (e, password) {
    if (e.target.value === password) {
      this.setState({ismatch: true})
    } else {
      this.setState({ismatch: false})
    }
  }
  render () {
    return (
      <Signup equal={this.equal} onSubmit={this.onSubmit} handlePwdChange={this.handlePwdChange}
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

  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(signup)
