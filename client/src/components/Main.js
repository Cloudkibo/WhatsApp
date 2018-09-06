import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './../containers/groups/groups'
import Contacts from './../containers/contacts/contacts'
import GroupDetail from './../containers/groups/groupDetail'
import Signup from './../containers/signup/signup'
import Login from './../containers/login/login'
import Chat from './../containers/chat/chat'
import auth from './../utility/auth.service'

function requireAuth (nextState, replace) {
  console.log('nextState', nextState)
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirectAuthUsers (nextState, replace) {
  console.log('redirectAuthUsers', nextState)
  if (auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Groups} />
        <Route exact path='/groupDetail' component={GroupDetail} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/chat' component={Chat} />
      </Switch>

    )
  }
}

export default Main
