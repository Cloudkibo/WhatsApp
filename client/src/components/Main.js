import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './../containers/groups/groups'
import Contacts from './../containers/contacts/contacts'
import GroupDetail from './../containers/groups/groupDetail'
import Signup from './../containers/signup/signup'
import Login from './../containers/login/login'

class Main extends Component {
  render () {
    return (

      <Switch>
        <Route exact path='/' component={Groups} />
        <Route exact path='/groupDetail' component={GroupDetail} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
      </Switch>

    )
  }
}

export default Main
