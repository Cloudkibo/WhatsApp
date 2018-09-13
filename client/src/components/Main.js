import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './../containers/dashboard/dashboard'
import Groups from './../containers/groups/groups'
import Contacts from './../containers/contacts/contacts'
import GroupDetail from './../containers/groups/groupDetail'
import Signup from './../containers/signup/signup'
import Login from './../containers/login/login'
import Chat from './../containers/chat/chat'
import Settings from './../containers/settings/settings'
import auth from './../utility/auth.service'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<Dashboard />))} />
        <Route exact path='/groups' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<Groups />))} />
        <Route exact path='/groupDetail' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<GroupDetail />))} />
        <Route exact path='/contacts' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<Contacts />))} />
        <Route exact path='/signup' render={() => (auth.loggedIn() ? (<Redirect to='/' />) : (<Signup />))} />
        <Route exact path='/login' render={() => (auth.loggedIn() ? (<Redirect to='/' />) : (<Login />))} />
        <Route exact path='/chat' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<Chat />))} />
        <Route exact path='/settings' render={() => (!auth.loggedIn() ? (<Redirect to='/login' />) : (<Settings />))} />
      </Switch>

    )
  }
}

export default Main
