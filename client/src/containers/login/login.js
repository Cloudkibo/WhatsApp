import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from './../../components/signupLogin'

class login extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onSubmit = (event, password, rpassword) => {
    event.preventDefault()
    // if (password.length > 6 && password === rpassword) {
    //   let data = {}
    //   console.log('in if')
      // if (this.state.account_type === 'team') {
      //   data = {
      //     name: this.refs.name.value.trim(),
      //     email: this.refs.email.value.trim(),
      //     domain: this.refs.domain.value.trim(),
      //     password: this.refs.password.value.trim(),
      //     company_name: this.refs.companyName.value.trim(),
      //     uiMode: this.state.mode
      //   }
      // } else {
      //   data = {
      //     name: this.refs.name.value.trim(),
      //     email: this.refs.email.value.trim(),
      //     password: this.refs.password.value.trim(),
      //     uiMode: this.state.mode
      //   }
      // }
      //
      // this.props.signUp(data, this.msg)
    // /}
  }
  render () {
    return (
      <Login type='Sign In' onSubmit={this.onSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(login)
